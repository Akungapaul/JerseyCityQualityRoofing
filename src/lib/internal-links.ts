import type { ServiceCategory } from '@/data/types';
import { ALL_BLOG_ARTICLES } from '@/data/content/blog';
import { ALL_COST_GUIDES } from '@/data/content/cost-guides';
import { ALL_MATERIAL_GUIDES } from '@/data/content/material-guides';
import { ALL_PROBLEMS } from '@/data/content/problems';

export interface ContentNode {
  slug: string;
  type: 'service' | 'city' | 'service-in-city' | 'blog' | 'cost-guide' | 'material-guide' | 'problem';
  title: string;
  path: string;
  siloService: string | null;
  siloCategory: ServiceCategory | null;
  tags: string[];
  relatedServiceSlugs: string[];
  relatedCitySlugs: string[];
  relatedMaterialSlugs: string[];
  relatedProblemSlugs: string[];
}

export interface InternalLink {
  title: string;
  path: string;
  type: ContentNode['type'];
  description?: string;
}

// Module-level content registry
const CONTENT_REGISTRY: ContentNode[] = [];
let initialized = false;

/**
 * Register a single content node in the registry.
 */
export function registerContent(node: ContentNode): void {
  CONTENT_REGISTRY.push(node);
}

/**
 * Register multiple content nodes at once.
 */
export function registerBulk(nodes: ContentNode[]): void {
  CONTENT_REGISTRY.push(...nodes);
}

/**
 * Clear the registry. Exported for test use only.
 */
export function clearRegistry(): void {
  CONTENT_REGISTRY.length = 0;
}

/**
 * Get the current registry size (useful for testing).
 */
export function getRegistrySize(): number {
  return CONTENT_REGISTRY.length;
}

/**
 * Compute a relevance score between two content nodes.
 * Higher score = more relevant.
 */
export function computeRelevanceScore(a: ContentNode, b: ContentNode): number {
  let score = 0;

  // Same silo: +10
  if (a.siloService && b.siloService && a.siloService === b.siloService) {
    score += 10;
  }

  // Shared tags: +2 per shared tag
  const aTags = new Set(a.tags);
  for (const tag of b.tags) {
    if (aTags.has(tag)) {
      score += 2;
    }
  }

  // Shared relatedServiceSlugs: +3 per shared service
  const aServices = new Set(a.relatedServiceSlugs);
  for (const slug of b.relatedServiceSlugs) {
    if (aServices.has(slug)) {
      score += 3;
    }
  }

  // Shared relatedMaterialSlugs: +2 per shared material
  const aMaterials = new Set(a.relatedMaterialSlugs);
  for (const slug of b.relatedMaterialSlugs) {
    if (aMaterials.has(slug)) {
      score += 2;
    }
  }

  // Shared relatedProblemSlugs: +2 per shared problem
  const aProblems = new Set(a.relatedProblemSlugs);
  for (const slug of b.relatedProblemSlugs) {
    if (aProblems.has(slug)) {
      score += 2;
    }
  }

  return score;
}

/**
 * Convert a ContentNode to an InternalLink.
 */
function nodeToLink(node: ContentNode): InternalLink {
  return {
    title: node.title,
    path: node.path,
    type: node.type,
  };
}

/**
 * Find a node by slug, or return undefined.
 */
function findNode(slug: string): ContentNode | undefined {
  return CONTENT_REGISTRY.find((n) => n.slug === slug);
}

/**
 * Returns blog-type nodes sorted by relevance score descending,
 * excluding currentSlug, capped at limit.
 */
export function getRelatedBlogArticles(currentSlug: string, limit = 3): InternalLink[] {
  const currentNode = findNode(currentSlug);
  if (!currentNode) return [];

  return CONTENT_REGISTRY
    .filter((n) => n.type === 'blog' && n.slug !== currentSlug)
    .map((n) => ({ node: n, score: computeRelevanceScore(currentNode, n) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ node }) => nodeToLink(node));
}

/**
 * Returns cost-guide and material-guide type nodes sorted by relevance,
 * capped at limit.
 */
export function getRelatedGuides(currentSlug: string, limit = 3): InternalLink[] {
  const currentNode = findNode(currentSlug);
  if (!currentNode) return [];

  return CONTENT_REGISTRY
    .filter((n) => (n.type === 'cost-guide' || n.type === 'material-guide') && n.slug !== currentSlug)
    .map((n) => ({ node: n, score: computeRelevanceScore(currentNode, n) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ node }) => nodeToLink(node));
}

/**
 * Returns all blog articles assigned to the given serviceSlug silo.
 */
export function getSiloArticles(serviceSlug: string): InternalLink[] {
  return CONTENT_REGISTRY
    .filter((n) => n.type === 'blog' && n.siloService === serviceSlug)
    .map(nodeToLink);
}

/**
 * Returns blog articles NOT in currentSilo, preferring standalone
 * (siloService=null) articles, capped at limit.
 */
export function getCrossSiloLinks(currentSilo: string, limit = 3): InternalLink[] {
  const crossSiloNodes = CONTENT_REGISTRY
    .filter((n) => n.type === 'blog' && n.siloService !== currentSilo);

  // Sort: standalone (siloService=null) first, then others
  crossSiloNodes.sort((a, b) => {
    const aStandalone = a.siloService === null ? 0 : 1;
    const bStandalone = b.siloService === null ? 0 : 1;
    return aStandalone - bStandalone;
  });

  return crossSiloNodes.slice(0, limit).map(nodeToLink);
}

/**
 * Returns a link to the service pillar page for a given serviceSlug and category.
 */
export function getServicePillarLink(serviceSlug: string, category: ServiceCategory): InternalLink {
  return {
    title: serviceSlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    path: `/services/${category}/${serviceSlug}`,
    type: 'service',
  };
}

/**
 * Finds the problem node and returns service-type nodes matching its relatedServiceSlugs.
 */
export function getProblemRelatedServices(problemSlug: string): InternalLink[] {
  const problemNode = CONTENT_REGISTRY.find(
    (n) => n.type === 'problem' && n.slug === problemSlug,
  );
  if (!problemNode) return [];

  const relatedSlugs = new Set(problemNode.relatedServiceSlugs);
  return CONTENT_REGISTRY
    .filter((n) => n.type === 'service' && relatedSlugs.has(n.slug))
    .map(nodeToLink);
}

/**
 * Finds the material node and returns service-type nodes matching its relatedServiceSlugs.
 */
export function getMaterialRelatedServices(materialSlug: string): InternalLink[] {
  const materialNode = CONTENT_REGISTRY.find(
    (n) => n.type === 'material-guide' && n.slug === materialSlug,
  );
  if (!materialNode) return [];

  const relatedSlugs = new Set(materialNode.relatedServiceSlugs);
  return CONTENT_REGISTRY
    .filter((n) => n.type === 'service' && relatedSlugs.has(n.slug))
    .map(nodeToLink);
}

/**
 * Returns blog articles whose relatedServiceSlugs includes serviceSlug, max 3.
 */
export function getBlogArticlesForService(serviceSlug: string): InternalLink[] {
  return CONTENT_REGISTRY
    .filter((n) => n.type === 'blog' && n.relatedServiceSlugs.includes(serviceSlug))
    .slice(0, 3)
    .map(nodeToLink);
}

/**
 * Returns the cost-guide node whose slug contains the serviceSlug, or null.
 */
export function getCostGuideForService(serviceSlug: string): InternalLink | null {
  const guide = CONTENT_REGISTRY.find(
    (n) => n.type === 'cost-guide' && n.slug.includes(serviceSlug),
  );
  return guide ? nodeToLink(guide) : null;
}

/**
 * Returns problem-type nodes sorted by relevance, capped at limit.
 */
export function getRelatedProblems(currentSlug: string, limit = 3): InternalLink[] {
  const currentNode = findNode(currentSlug);
  if (!currentNode) return [];

  return CONTENT_REGISTRY
    .filter((n) => n.type === 'problem' && n.slug !== currentSlug)
    .map((n) => ({ node: n, score: computeRelevanceScore(currentNode, n) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ node }) => nodeToLink(node));
}

/**
 * Initialize the content registry with all content from data files.
 * Idempotent: only populates on the first call.
 */
export function initializeContentRegistry(): void {
  if (initialized) return;

  // Blog articles
  for (const article of ALL_BLOG_ARTICLES) {
    registerContent({
      slug: article.slug,
      type: 'blog',
      title: article.title,
      path: `/blog/${article.slug}`,
      siloService: article.siloService,
      siloCategory: article.siloCategory,
      tags: article.tags,
      relatedServiceSlugs: article.relatedServiceSlugs,
      relatedCitySlugs: article.relatedCitySlugs,
      relatedMaterialSlugs: article.relatedMaterialSlugs,
      relatedProblemSlugs: article.relatedProblemSlugs,
    });
  }

  // Cost guides
  for (const guide of ALL_COST_GUIDES) {
    registerContent({
      slug: guide.slug,
      type: 'cost-guide',
      title: guide.title,
      path: `/guides/cost/${guide.slug}`,
      siloService: guide.serviceSlug,
      siloCategory: guide.serviceCategory,
      tags: [],
      relatedServiceSlugs: [guide.serviceSlug],
      relatedCitySlugs: guide.locationPricing.map((lp) => lp.citySlug),
      relatedMaterialSlugs: [],
      relatedProblemSlugs: [],
    });
  }

  // Material guides
  for (const guide of ALL_MATERIAL_GUIDES) {
    registerContent({
      slug: guide.slug,
      type: 'material-guide',
      title: guide.title,
      path: `/guides/materials/${guide.slug}`,
      siloService: null,
      siloCategory: null,
      tags: [],
      relatedServiceSlugs: guide.relatedServiceSlugs,
      relatedCitySlugs: [],
      relatedMaterialSlugs: [],
      relatedProblemSlugs: [],
    });
  }

  // Problems
  for (const problem of ALL_PROBLEMS) {
    registerContent({
      slug: problem.slug,
      type: 'problem',
      title: problem.title,
      path: `/problems/${problem.slug}`,
      siloService: null,
      siloCategory: null,
      tags: [],
      relatedServiceSlugs: problem.relatedServiceSlugs,
      relatedCitySlugs: [],
      relatedMaterialSlugs: [],
      relatedProblemSlugs: [],
    });
  }

  initialized = true;
}

/**
 * Reset the registry and initialized flag. Exported for test use only.
 */
export function resetRegistry(): void {
  clearRegistry();
  initialized = false;
}
