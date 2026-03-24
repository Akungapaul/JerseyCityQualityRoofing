interface ServiceContentSectionProps {
  heading: string;
  content: string;
  headingId?: string;
}

export function ServiceContentSection({
  heading,
  content,
  headingId,
}: ServiceContentSectionProps) {
  const paragraphs = content.includes("\n\n")
    ? content.split("\n\n")
    : [content];

  return (
    <div>
      <h2
        id={headingId}
        className="text-[1.75rem] font-heading font-bold text-text-primary"
      >
        {heading}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-lg text-text-secondary leading-relaxed mt-4"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
