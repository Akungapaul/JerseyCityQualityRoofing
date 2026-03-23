import { getAllMunicipalitySlugs, getMunicipality } from '../src/data/municipalities';
import { getAllServiceSlugs, getService, getResidentialServiceSlugs, getCommercialServiceSlugs } from '../src/data/services';
import { TESTIMONIALS, getTestimonialsByCity } from '../src/data/testimonials';
import { getCityServiceContent } from '../src/data/service-city-content';

let errors = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    errors++;
  } else {
    console.log(`PASS: ${message}`);
  }
}

// Municipality checks
const citySlugs = getAllMunicipalitySlugs();
assert(citySlugs.length === 12, `12 municipalities (got ${citySlugs.length})`);

citySlugs.forEach((slug) => {
  const m = getMunicipality(slug);
  assert(!!m, `Municipality ${slug} exists`);
  if (m) {
    assert(m.landmarks.length >= 5, `${slug} has 5+ landmarks (got ${m.landmarks.length})`);
    assert(m.zipCodes.length >= 1, `${slug} has ZIP codes`);
    assert(m.neighborhoods.length >= 3, `${slug} has 3+ neighborhoods`);
  }
});

// Service checks
const serviceSlugs = getAllServiceSlugs();
assert(serviceSlugs.length === 8, `8 services (got ${serviceSlugs.length})`);
assert(getResidentialServiceSlugs().length === 4, '4 residential services');
assert(getCommercialServiceSlugs().length === 4, '4 commercial services');

serviceSlugs.forEach((slug) => {
  const s = getService(slug);
  assert(!!s, `Service ${slug} exists`);
  if (s) {
    assert(s.faqs.length >= 5, `${slug} has 5+ FAQs (got ${s.faqs.length})`);
    assert(s.processSteps.length >= 3, `${slug} has 3+ process steps`);
  }
});

// Testimonial checks
assert(TESTIMONIALS.length >= 36, `36+ testimonials (got ${TESTIMONIALS.length})`);
citySlugs.forEach((slug) => {
  const cityTestimonials = getTestimonialsByCity(slug);
  assert(cityTestimonials.length >= 3, `${slug} has 3+ testimonials (got ${cityTestimonials.length})`);
});

// Cross-reference checks
const sampleContent = getCityServiceContent('roof-repair', 'jersey-city');
assert(sampleContent !== null, 'getCityServiceContent returns data for roof-repair + jersey-city');
if (sampleContent) {
  assert(sampleContent.uniqueFaqs.length >= 3, 'Cross-reference has 3+ unique FAQs');
}

// Summary
console.log(`\n${errors === 0 ? 'ALL CHECKS PASSED' : `${errors} CHECKS FAILED`}`);
process.exit(errors === 0 ? 0 : 1);
