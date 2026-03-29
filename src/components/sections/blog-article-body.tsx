interface BlogArticleBodyProps {
  heading: string;
  headingLevel: 2 | 3;
  content: string;
  headingId: string;
}

export function BlogArticleBody({
  heading,
  headingLevel,
  content,
  headingId,
}: BlogArticleBodyProps) {
  const paragraphs = content.includes("\n\n")
    ? content.split("\n\n")
    : [content];

  const HeadingTag = headingLevel === 2 ? "h2" : "h3";
  const headingClassName =
    headingLevel === 2
      ? "text-[1.75rem] font-heading font-bold text-text-primary"
      : "text-lg font-heading font-bold text-text-primary";

  return (
    <div className="max-w-3xl">
      <HeadingTag id={headingId} className={headingClassName}>
        {heading}
      </HeadingTag>
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
