import { JsonLd } from '@/lib/seo/json-ld';
import type { CoraSupplement, CoraSupplementSection } from '@/data/types';

// Expandable supplemental content block (native <details>: starts collapsed,
// all content present in the served HTML). Rendered by the residential
// service-city template only for pages whose content data carries a
// coraSupplement. Visible copy is written for readers; no tooling labels.

function SupplementSection({ section }: { section: CoraSupplementSection }) {
  const HeadingTag = section.headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className="mt-8 first:mt-0">
      <HeadingTag className="font-heading font-bold text-[1.4rem] text-text-primary mb-4">
        {section.heading}
      </HeadingTag>
      {section.paragraphs?.map((paragraph, i) => (
        <p key={i} className="text-lg text-text-secondary leading-relaxed mb-4">
          {paragraph}
        </p>
      ))}
      {section.questions?.map((qa, i) => (
        <div key={i} className="mb-5">
          <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
            {qa.question}
          </h3>
          <p className="text-lg text-text-secondary leading-relaxed">
            {qa.answer}
          </p>
        </div>
      ))}
      {section.listItems && section.listItems.length > 0 && (
        <ul className="list-disc pl-6 space-y-2 text-lg text-text-secondary leading-relaxed mb-4">
          {section.listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {section.links && section.links.length > 0 && (
        <ul className="space-y-2 text-lg leading-relaxed mb-4">
          {section.links.map((link, i) => (
            <li key={i}>
              <a href={link.href} className="text-accent underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CoraSupplementBlock({
  supplement,
}: {
  supplement: CoraSupplement;
}) {
  return (
    <>
      {supplement.jsonLdSnippets?.map((snippet, i) => (
        <JsonLd key={i} data={snippet} />
      ))}
      {supplement.styleCss && (
        <style dangerouslySetInnerHTML={{ __html: supplement.styleCss }} />
      )}
      {supplement.htmlComments && supplement.htmlComments.length > 0 && (
        <div
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: supplement.htmlComments
              .map((comment) => `<!-- ${comment.replace(/--/g, '-')} -->`)
              .join('\n'),
          }}
        />
      )}
      <details className="group border border-[#4a5040] rounded-md">
        <summary className="cursor-pointer list-none px-5 py-4 min-h-[44px] font-heading font-bold text-lg text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none">
          {supplement.summaryLabel}
        </summary>
        <div className="px-5 pb-6 pt-2">
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            {supplement.heading}
          </h2>
          {supplement.introParagraphs?.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg text-text-secondary leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
          {supplement.sections.map((section, i) => (
            <SupplementSection key={i} section={section} />
          ))}
          {supplement.navLinks && supplement.navLinks.length > 0 && (
            <nav aria-label={supplement.summaryLabel} className="mt-8">
              <ul className="space-y-2 text-lg leading-relaxed">
                {supplement.navLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-accent underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {supplement.externalLinks && supplement.externalLinks.length > 0 && (
            <div className="mt-8">
              <ul className="space-y-2 text-lg leading-relaxed">
                {supplement.externalLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-accent underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {supplement.spans && supplement.spans.length > 0 && (
            <p className="mt-8 text-lg text-text-secondary leading-relaxed">
              {supplement.spans.map((phrase, i) => (
                <span key={i} className="inline-block mr-3 mb-2">
                  {phrase}
                </span>
              ))}
            </p>
          )}
          {supplement.images && supplement.images.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {supplement.images.map((image, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-auto"
                />
              ))}
            </div>
          )}
        </div>
      </details>
    </>
  );
}
