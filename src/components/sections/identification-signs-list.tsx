interface IdentificationSignsListProps {
  signs: string[];
  problemName: string;
}

export function IdentificationSignsList({
  signs,
  problemName,
}: IdentificationSignsListProps) {
  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
        How to Identify {problemName}
      </h2>
      <ol className="space-y-4">
        {signs.map((sign, index) => (
          <li key={index} className="flex items-start gap-4 py-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-accent text-dominant flex items-center justify-center font-bold text-[0.875rem]">
              {index + 1}
            </span>
            <span className="text-lg text-text-secondary leading-relaxed">
              {sign}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
