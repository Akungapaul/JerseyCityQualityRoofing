import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  tone?: "dominant" | "secondary";
  id?: string;
  className?: string;
}

export function SectionWrapper({
  children,
  tone = "dominant",
  id,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16 lg:py-20",
        tone === "dominant" ? "bg-dominant" : "bg-secondary",
        className,
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
