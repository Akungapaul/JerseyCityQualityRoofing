import { describe, it, expect, beforeEach } from 'vitest';
import {
  registerContent,
  registerBulk,
  clearRegistry,
  getRegistrySize,
  computeRelevanceScore,
  getRelatedBlogArticles,
  getRelatedGuides,
  getSiloArticles,
  getCrossSiloLinks,
  getServicePillarLink,
  getProblemRelatedServices,
  getMaterialRelatedServices,
  getBlogArticlesForService,
  getCostGuideForService,
  getRelatedProblems,
  initializeContentRegistry,
  resetRegistry,
} from '@/lib/internal-links';
import type { ContentNode } from '@/lib/internal-links';

// Test fixtures
function makeBlogNode(overrides: Partial<ContentNode> = {}): ContentNode {
  const slug = overrides.slug ?? 'test-blog';
  return {
    slug,
    type: 'blog',
    title: 'Test Blog Article',
    path: `/blog/${slug}`,
    siloService: null,
    siloCategory: null,
    tags: ['roofing'],
    relatedServiceSlugs: ['roof-repair'],
    relatedCitySlugs: ['jersey-city'],
    relatedMaterialSlugs: [],
    relatedProblemSlugs: [],
    ...overrides,
  };
}

function makeServiceNode(overrides: Partial<ContentNode> = {}): ContentNode {
  return {
    slug: 'roof-repair',
    type: 'service',
    title: 'Roof Repair',
    path: '/services/residential/roof-repair',
    siloService: 'roof-repair',
    siloCategory: 'residential',
    tags: ['repair', 'residential'],
    relatedServiceSlugs: [],
    relatedCitySlugs: [],
    relatedMaterialSlugs: ['asphalt-shingles'],
    relatedProblemSlugs: ['missing-shingles'],
    ...overrides,
  };
}

describe('internal-links', () => {
  beforeEach(() => {
    clearRegistry();
  });

  describe('registerContent and registerBulk', () => {
    it('registerContent adds a node to the registry', () => {
      expect(getRegistrySize()).toBe(0);
      registerContent(makeBlogNode());
      expect(getRegistrySize()).toBe(1);
    });

    it('registerBulk adds multiple nodes to the registry', () => {
      registerBulk([
        makeBlogNode({ slug: 'blog-1' }),
        makeBlogNode({ slug: 'blog-2' }),
        makeBlogNode({ slug: 'blog-3' }),
      ]);
      expect(getRegistrySize()).toBe(3);
    });
  });

  describe('computeRelevanceScore', () => {
    it('scores same silo with +10', () => {
      const a = makeBlogNode({ siloService: 'roof-repair', tags: [], relatedServiceSlugs: [], relatedMaterialSlugs: [], relatedProblemSlugs: [] });
      const b = makeBlogNode({ slug: 'other', siloService: 'roof-repair', tags: [], relatedServiceSlugs: [], relatedMaterialSlugs: [], relatedProblemSlugs: [] });
      expect(computeRelevanceScore(a, b)).toBe(10);
    });

    it('scores shared tags with +2 per tag', () => {
      const a = makeBlogNode({ siloService: null, tags: ['roofing', 'repair', 'hudson-county'], relatedServiceSlugs: [], relatedMaterialSlugs: [], relatedProblemSlugs: [] });
      const b = makeBlogNode({ slug: 'other', siloService: null, tags: ['roofing', 'repair'], relatedServiceSlugs: [], relatedMaterialSlugs: [], relatedProblemSlugs: [] });
      expect(computeRelevanceScore(a, b)).toBe(4); // 2 shared tags x 2
    });

    it('scores shared relatedServiceSlugs with +3 per service', () => {
      const a = makeBlogNode({ siloService: null, tags: [], relatedServiceSlugs: ['roof-repair', 'roof-replacement'], relatedMaterialSlugs: [], relatedProblemSlugs: [] });
      const b = makeBlogNode({ slug: 'other', siloService: null, tags: [], relatedServiceSlugs: ['roof-repair'], relatedMaterialSlugs: [], relatedProblemSlugs: [] });
      expect(computeRelevanceScore(a, b)).toBe(3); // 1 shared service x 3
    });

    it('scores correctly: same silo > tag overlap', () => {
      const base = makeBlogNode({ siloService: 'roof-repair', tags: ['a'], relatedServiceSlugs: [], relatedMaterialSlugs: [], relatedProblemSlugs: [] });
      const sameSilo = makeBlogNode({ slug: 'same-silo', siloService: 'roof-repair', tags: [], relatedServiceSlugs: [], relatedMaterialSlugs: [], relatedProblemSlugs: [] });
      const manyTags = makeBlogNode({ slug: 'many-tags', siloService: null, tags: ['a', 'b', 'c', 'd'], relatedServiceSlugs: [], relatedMaterialSlugs: [], relatedProblemSlugs: [] });

      const sameSiloScore = computeRelevanceScore(base, sameSilo);
      const manyTagsScore = computeRelevanceScore(base, manyTags);

      expect(sameSiloScore).toBeGreaterThan(manyTagsScore);
    });

    it('accumulates scores from multiple dimensions', () => {
      const a = makeBlogNode({
        siloService: 'roof-repair',
        tags: ['repair'],
        relatedServiceSlugs: ['roof-repair'],
        relatedMaterialSlugs: ['asphalt-shingles'],
        relatedProblemSlugs: ['missing-shingles'],
      });
      const b = makeBlogNode({
        slug: 'other',
        siloService: 'roof-repair',
        tags: ['repair'],
        relatedServiceSlugs: ['roof-repair'],
        relatedMaterialSlugs: ['asphalt-shingles'],
        relatedProblemSlugs: ['missing-shingles'],
      });
      // 10 (silo) + 2 (1 tag) + 3 (1 service) + 2 (1 material) + 2 (1 problem) = 19
      expect(computeRelevanceScore(a, b)).toBe(19);
    });
  });

  describe('getRelatedBlogArticles', () => {
    it('returns max 3 results, excludes current slug, sorted by relevance', () => {
      const current = makeBlogNode({
        slug: 'current',
        siloService: 'roof-repair',
        tags: ['repair'],
        relatedServiceSlugs: ['roof-repair'],
      });
      const sameSilo = makeBlogNode({
        slug: 'same-silo',
        siloService: 'roof-repair',
        tags: ['repair'],
      });
      const tagOverlap = makeBlogNode({
        slug: 'tag-overlap',
        siloService: null,
        tags: ['repair'],
      });
      const unrelated = makeBlogNode({
        slug: 'unrelated',
        siloService: 'flat-roof-systems',
        tags: ['commercial'],
      });
      const alsoUnrelated = makeBlogNode({
        slug: 'also-unrelated',
        siloService: null,
        tags: ['inspection'],
      });

      registerBulk([current, sameSilo, tagOverlap, unrelated, alsoUnrelated]);

      const results = getRelatedBlogArticles('current', 3);
      expect(results.length).toBeLessThanOrEqual(3);
      expect(results.map((r) => r.path)).not.toContain('/blog/current');
      // Same silo should be first (highest relevance)
      expect(results[0].path).toBe('/blog/same-silo');
    });

    it('prioritizes same-silo articles', () => {
      const current = makeBlogNode({
        slug: 'current',
        siloService: 'roof-repair',
        tags: [],
        relatedServiceSlugs: [],
        relatedMaterialSlugs: [],
        relatedProblemSlugs: [],
      });
      const sameSilo1 = makeBlogNode({
        slug: 'same-1',
        siloService: 'roof-repair',
        tags: [],
        relatedServiceSlugs: [],
        relatedMaterialSlugs: [],
        relatedProblemSlugs: [],
      });
      const differentSilo = makeBlogNode({
        slug: 'diff-1',
        siloService: 'flat-roof-systems',
        tags: [],
        relatedServiceSlugs: [],
        relatedMaterialSlugs: [],
        relatedProblemSlugs: [],
      });

      registerBulk([current, sameSilo1, differentSilo]);

      const results = getRelatedBlogArticles('current');
      expect(results[0].path).toBe('/blog/same-1');
    });
  });

  describe('getCrossSiloLinks', () => {
    it('excludes current silo articles and prefers standalone', () => {
      const standalone = makeBlogNode({
        slug: 'standalone',
        siloService: null,
        path: '/blog/standalone',
      });
      const otherSilo = makeBlogNode({
        slug: 'other-silo',
        siloService: 'flat-roof-systems',
        path: '/blog/other-silo',
      });
      const currentSilo = makeBlogNode({
        slug: 'current-silo',
        siloService: 'roof-repair',
        path: '/blog/current-silo',
      });

      registerBulk([standalone, otherSilo, currentSilo]);

      const results = getCrossSiloLinks('roof-repair', 3);
      // Should exclude current-silo
      expect(results.map((r) => r.path)).not.toContain('/blog/current-silo');
      // Standalone should be first
      expect(results[0].path).toBe('/blog/standalone');
    });
  });

  describe('getServicePillarLink', () => {
    it('returns correct path for residential service', () => {
      const link = getServicePillarLink('roof-repair', 'residential');
      expect(link.path).toBe('/services/residential/roof-repair');
      expect(link.type).toBe('service');
    });

    it('returns correct path for commercial service', () => {
      const link = getServicePillarLink('flat-roof-systems', 'commercial');
      expect(link.path).toBe('/services/commercial/flat-roof-systems');
      expect(link.type).toBe('service');
    });
  });

  describe('getSiloArticles', () => {
    it('returns only articles matching serviceSlug', () => {
      registerBulk([
        makeBlogNode({ slug: 'repair-1', siloService: 'roof-repair', path: '/blog/repair-1' }),
        makeBlogNode({ slug: 'repair-2', siloService: 'roof-repair', path: '/blog/repair-2' }),
        makeBlogNode({ slug: 'inspect-1', siloService: 'roof-inspection', path: '/blog/inspect-1' }),
        makeBlogNode({ slug: 'standalone', siloService: null, path: '/blog/standalone' }),
      ]);

      const results = getSiloArticles('roof-repair');
      expect(results.length).toBe(2);
      expect(results.every((r) => r.path.includes('repair'))).toBe(true);
    });
  });

  describe('getBlogArticlesForService', () => {
    it('caps at 3 results', () => {
      registerBulk([
        makeBlogNode({ slug: 'a1', relatedServiceSlugs: ['roof-repair'] }),
        makeBlogNode({ slug: 'a2', relatedServiceSlugs: ['roof-repair'] }),
        makeBlogNode({ slug: 'a3', relatedServiceSlugs: ['roof-repair'] }),
        makeBlogNode({ slug: 'a4', relatedServiceSlugs: ['roof-repair'] }),
      ]);

      const results = getBlogArticlesForService('roof-repair');
      expect(results.length).toBe(3);
    });
  });

  describe('getCostGuideForService', () => {
    it('returns null when no match', () => {
      registerBulk([
        {
          slug: 'roof-repair-cost',
          type: 'cost-guide',
          title: 'Roof Repair Cost Guide',
          path: '/guides/cost/roof-repair-cost',
          siloService: 'roof-repair',
          siloCategory: 'residential',
          tags: [],
          relatedServiceSlugs: ['roof-repair'],
          relatedCitySlugs: [],
          relatedMaterialSlugs: [],
          relatedProblemSlugs: [],
        },
      ]);

      const result = getCostGuideForService('flat-roof-systems');
      expect(result).toBeNull();
    });

    it('returns matching cost guide', () => {
      registerBulk([
        {
          slug: 'roof-repair-cost',
          type: 'cost-guide',
          title: 'Roof Repair Cost Guide',
          path: '/guides/cost/roof-repair-cost',
          siloService: 'roof-repair',
          siloCategory: 'residential',
          tags: [],
          relatedServiceSlugs: ['roof-repair'],
          relatedCitySlugs: [],
          relatedMaterialSlugs: [],
          relatedProblemSlugs: [],
        },
      ]);

      const result = getCostGuideForService('roof-repair');
      expect(result).not.toBeNull();
      expect(result!.path).toBe('/guides/cost/roof-repair-cost');
    });
  });

  describe('getProblemRelatedServices', () => {
    it('returns service nodes matching problem relatedServiceSlugs', () => {
      registerBulk([
        {
          slug: 'missing-shingles',
          type: 'problem',
          title: 'Missing Shingles',
          path: '/problems/missing-shingles',
          siloService: null,
          siloCategory: null,
          tags: [],
          relatedServiceSlugs: ['roof-repair', 'emergency-roofing'],
          relatedCitySlugs: [],
          relatedMaterialSlugs: [],
          relatedProblemSlugs: [],
        },
        makeServiceNode({ slug: 'roof-repair', title: 'Roof Repair', path: '/services/residential/roof-repair' }),
        makeServiceNode({ slug: 'emergency-roofing', title: 'Emergency Roofing', path: '/services/residential/emergency-roofing' }),
        makeServiceNode({ slug: 'roof-inspection', title: 'Roof Inspection', path: '/services/residential/roof-inspection' }),
      ]);

      const results = getProblemRelatedServices('missing-shingles');
      expect(results.length).toBe(2);
      expect(results.map((r) => r.path)).toContain('/services/residential/roof-repair');
      expect(results.map((r) => r.path)).toContain('/services/residential/emergency-roofing');
    });
  });

  describe('getMaterialRelatedServices', () => {
    it('returns service nodes matching material relatedServiceSlugs', () => {
      registerBulk([
        {
          slug: 'asphalt-shingles',
          type: 'material-guide',
          title: 'Asphalt Shingles Guide',
          path: '/guides/materials/asphalt-shingles',
          siloService: null,
          siloCategory: null,
          tags: [],
          relatedServiceSlugs: ['roof-repair', 'roof-replacement'],
          relatedCitySlugs: [],
          relatedMaterialSlugs: [],
          relatedProblemSlugs: [],
        },
        makeServiceNode({ slug: 'roof-repair' }),
        makeServiceNode({ slug: 'roof-replacement', title: 'Roof Replacement', path: '/services/residential/roof-replacement' }),
      ]);

      const results = getMaterialRelatedServices('asphalt-shingles');
      expect(results.length).toBe(2);
    });
  });

  describe('getRelatedProblems', () => {
    it('returns problem-type nodes sorted by relevance, excluding current', () => {
      const current = makeBlogNode({
        slug: 'current',
        relatedProblemSlugs: ['missing-shingles', 'wind-damage'],
      });
      registerContent(current);

      registerBulk([
        {
          slug: 'missing-shingles',
          type: 'problem',
          title: 'Missing Shingles',
          path: '/problems/missing-shingles',
          siloService: null,
          siloCategory: null,
          tags: [],
          relatedServiceSlugs: [],
          relatedCitySlugs: [],
          relatedMaterialSlugs: [],
          relatedProblemSlugs: ['missing-shingles'],
        },
        {
          slug: 'ice-dams',
          type: 'problem',
          title: 'Ice Dams',
          path: '/problems/ice-dams',
          siloService: null,
          siloCategory: null,
          tags: [],
          relatedServiceSlugs: [],
          relatedCitySlugs: [],
          relatedMaterialSlugs: [],
          relatedProblemSlugs: [],
        },
      ]);

      const results = getRelatedProblems('current', 3);
      expect(results.length).toBe(2);
      // missing-shingles should be first (shared relatedProblemSlugs)
      expect(results[0].path).toBe('/problems/missing-shingles');
    });
  });

  describe('initializeContentRegistry — service and city nodes', () => {
    beforeEach(() => {
      resetRegistry();
    });

    it('registers 8 service nodes and 12 city nodes in addition to content nodes', () => {
      initializeContentRegistry();
      const size = getRegistrySize();
      // 8 blog + N cost guides + 6 material guides + 5 problems + 8 services + 12 cities
      // Must be at least 39 (8+6+5+8+12)
      expect(size).toBeGreaterThanOrEqual(8 + 6 + 5 + 8 + 12);
    });

    it('getProblemRelatedServices returns service links after initialization', () => {
      initializeContentRegistry();
      // missing-shingles problem has relatedServiceSlugs: ['roof-repair', 'emergency-roofing']
      const results = getProblemRelatedServices('missing-shingles');
      expect(results.length).toBeGreaterThan(0);
      expect(results.map((r) => r.path)).toContain('/services/residential/roof-repair');
    });

    it('getMaterialRelatedServices returns service links after initialization', () => {
      initializeContentRegistry();
      // asphalt-shingles material has relatedServiceSlugs: ['roof-repair', 'roof-replacement']
      const results = getMaterialRelatedServices('asphalt-shingles');
      expect(results.length).toBeGreaterThan(0);
      expect(results.map((r) => r.path)).toContain('/services/residential/roof-repair');
    });
  });
});
