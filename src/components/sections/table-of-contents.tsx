interface TableOfContentsProps {
  sections: { heading: string; headingLevel: 2 | 3; headingId: string }[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <div className="bg-secondary rounded-lg p-6 border border-[#4a5040]">
      <h2 className="text-lg font-heading font-bold text-text-primary mb-4">
        In This Article
      </h2>
      <nav aria-label="Table of contents">
        <ol className="space-y-1">
          {sections.map((section) => (
            <li key={section.headingId}>
              <a
                href={`#${section.headingId}`}
                className={`py-2 text-[0.875rem] text-text-secondary hover:text-accent transition-colors duration-[150ms] min-h-[44px] inline-flex items-center${section.headingLevel === 3 ? " pl-4" : ""}`}
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
