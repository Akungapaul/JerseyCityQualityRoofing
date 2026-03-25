import { describe, it, expect } from 'vitest';

// Helper to count words in a string
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// These imports will resolve after Task 2 creates content files
import { ROOF_REPAIR_CONTENT } from '@/data/content/roof-repair';
import { ROOF_REPLACEMENT_CONTENT } from '@/data/content/roof-replacement';
import { ROOF_INSPECTION_CONTENT } from '@/data/content/roof-inspection';
import { EMERGENCY_ROOFING_CONTENT } from '@/data/content/emergency-roofing';
import { FLAT_ROOF_SYSTEMS_CONTENT } from '@/data/content/flat-roof-systems';
import { ROOF_MAINTENANCE_CONTENT } from '@/data/content/roof-maintenance';
import { COMMERCIAL_REPAIR_CONTENT } from '@/data/content/commercial-repair';
import { COMMERCIAL_REPLACEMENT_CONTENT } from '@/data/content/commercial-replacement';
import type { ServiceContent, EmergencyContent } from '@/data/types';

const STANDARD_CONTENTS: Array<{ name: string; content: ServiceContent }> = [
  { name: 'roof-repair', content: ROOF_REPAIR_CONTENT },
  { name: 'roof-replacement', content: ROOF_REPLACEMENT_CONTENT },
  { name: 'roof-inspection', content: ROOF_INSPECTION_CONTENT },
  { name: 'flat-roof-systems', content: FLAT_ROOF_SYSTEMS_CONTENT },
  { name: 'roof-maintenance', content: ROOF_MAINTENANCE_CONTENT },
  { name: 'commercial-repair', content: COMMERCIAL_REPAIR_CONTENT },
  { name: 'commercial-replacement', content: COMMERCIAL_REPLACEMENT_CONTENT },
];

const ALL_CONTENTS: Array<{ name: string; content: ServiceContent }> = [
  ...STANDARD_CONTENTS,
  { name: 'emergency-roofing', content: EMERGENCY_ROOFING_CONTENT },
];

describe('service content data', () => {
  describe.each(ALL_CONTENTS)('$name', ({ name, content }) => {
    it('has slug matching filename', () => {
      expect(content.slug).toBe(name);
    });

    it('has heroHeadline and heroSubtitle', () => {
      expect(content.heroHeadline.length).toBeGreaterThan(10);
      expect(content.heroSubtitle.length).toBeGreaterThan(10);
    });

    it('has introNarrative with ~500 words', () => {
      const words = countWords(content.introNarrative);
      expect(words).toBeGreaterThanOrEqual(400);
      expect(words).toBeLessThanOrEqual(700);
    });

    it('has processNarrative with ~600 words', () => {
      const words = countWords(content.processNarrative);
      expect(words).toBeGreaterThanOrEqual(450);
      expect(words).toBeLessThanOrEqual(800);
    });

    it('has materialsIntro', () => {
      expect(countWords(content.materialsIntro)).toBeGreaterThanOrEqual(50);
    });

    it('has costFactorsIntro', () => {
      expect(countWords(content.costFactorsIntro)).toBeGreaterThanOrEqual(30);
    });

    it('has warningSignsIntro', () => {
      expect(countWords(content.warningSignsIntro)).toBeGreaterThanOrEqual(30);
    });

    it('has 5-6 warning signs', () => {
      expect(content.warningSigns.length).toBeGreaterThanOrEqual(5);
      expect(content.warningSigns.length).toBeLessThanOrEqual(6);
    });

    it('each warning sign has icon, title, and description', () => {
      content.warningSigns.forEach((sign) => {
        expect(sign.icon.length).toBeGreaterThan(0);
        expect(sign.title.length).toBeGreaterThan(0);
        expect(sign.description.length).toBeGreaterThan(20);
      });
    });

    it('has 3-5 extended FAQs', () => {
      expect(content.extendedFaqs.length).toBeGreaterThanOrEqual(3);
      expect(content.extendedFaqs.length).toBeLessThanOrEqual(5);
    });

    it('each extended FAQ has question and answer of 3+ sentences', () => {
      content.extendedFaqs.forEach((faq) => {
        expect(faq.question.length).toBeGreaterThan(10);
        expect(faq.answer.length).toBeGreaterThan(50);
      });
    });
  });

  describe('voice and local context', () => {
    it.each(ALL_CONTENTS)('$name uses first-person voice (contains "we" and "our")', ({ content }) => {
      const allText = [
        content.introNarrative,
        content.processNarrative,
      ].join(' ').toLowerCase();
      expect(allText).toContain('we ');
      expect(allText).toContain('our ');
    });

    it.each(ALL_CONTENTS)('$name contains Hudson County local references', ({ content }) => {
      const allText = [
        content.introNarrative,
        content.processNarrative,
        content.materialsIntro,
      ].join(' ').toLowerCase();
      const localTerms = ['jersey city', 'hudson county', 'brownstone', "nor'easter", 'hudson river'];
      const hasLocal = localTerms.some((term) => allText.includes(term));
      expect(hasLocal).toBe(true);
    });
  });

  describe('commercial voice and terminology', () => {
    const COMMERCIAL_CONTENTS: Array<{ name: string; content: ServiceContent }> = [
      { name: 'flat-roof-systems', content: FLAT_ROOF_SYSTEMS_CONTENT },
      { name: 'roof-maintenance', content: ROOF_MAINTENANCE_CONTENT },
      { name: 'commercial-repair', content: COMMERCIAL_REPAIR_CONTENT },
      { name: 'commercial-replacement', content: COMMERCIAL_REPLACEMENT_CONTENT },
    ];

    it.each(COMMERCIAL_CONTENTS)(
      '$name uses commercial terminology (not residential)',
      ({ content }) => {
        const allText = [
          content.introNarrative,
          content.processNarrative,
          content.materialsIntro,
        ].join(' ').toLowerCase();
        const commercialTerms = [
          'building',
          'property manager',
          'membrane',
          'flat roof',
          'commercial',
        ];
        const hasCommercial = commercialTerms.some((term) => allText.includes(term));
        expect(hasCommercial).toBe(true);
      },
    );

    it.each(COMMERCIAL_CONTENTS)(
      '$name does not use residential-only language in intro',
      ({ content }) => {
        const introLower = content.introNarrative.toLowerCase();
        expect(introLower).not.toContain('homeowner');
        expect(introLower).not.toContain('your home');
      },
    );
  });

  describe('word count per content file', () => {
    it.each(ALL_CONTENTS)('$name has 2200+ total words across all prose fields', ({ content }) => {
      const totalWords = countWords([
        content.heroHeadline,
        content.heroSubtitle,
        content.introNarrative,
        content.processNarrative,
        content.materialsIntro,
        content.costFactorsIntro,
        content.warningSignsIntro,
        ...content.warningSigns.map((s) => `${s.title} ${s.description}`),
        ...content.extendedFaqs.map((f) => `${f.question} ${f.answer}`),
      ].join(' '));
      expect(totalWords).toBeGreaterThanOrEqual(2200);
    });
  });

  describe('emergency-roofing specific fields', () => {
    const emergency = EMERGENCY_ROOFING_CONTENT as EmergencyContent;

    it('has whatToDoSteps with 4+ steps', () => {
      expect(emergency.whatToDoSteps.length).toBeGreaterThanOrEqual(4);
    });

    it('each whatToDoStep has title and description', () => {
      emergency.whatToDoSteps.forEach((step) => {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.description.length).toBeGreaterThan(20);
      });
    });

    it('has stormDamageTypes with 4+ types', () => {
      expect(emergency.stormDamageTypes.length).toBeGreaterThanOrEqual(4);
    });

    it('each stormDamageType has icon, name, and description', () => {
      emergency.stormDamageTypes.forEach((type) => {
        expect(type.icon.length).toBeGreaterThan(0);
        expect(type.name.length).toBeGreaterThan(0);
        expect(type.description.length).toBeGreaterThan(20);
      });
    });

    it('has insuranceClaims with intro, whatWeHandle, and whatToDocument', () => {
      expect(emergency.insuranceClaims.intro.length).toBeGreaterThan(50);
      expect(emergency.insuranceClaims.whatWeHandle.length).toBeGreaterThanOrEqual(4);
      expect(emergency.insuranceClaims.whatToDocument.length).toBeGreaterThanOrEqual(4);
    });
  });
});
