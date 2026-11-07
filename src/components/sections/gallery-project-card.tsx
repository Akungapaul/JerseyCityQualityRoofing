import type { GalleryProject } from "@/data/types";

interface GalleryProjectCardProps {
  project: GalleryProject;
}

function formatCompletionDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Project profile card (CRO Phase 4, 2026-11-06; audit 6.1).
 *
 * This card used to render a before/after comparison SLIDER fed by
 * SVG placeholder panels whose alt text described photographic roof
 * scenes -- presenting illustrations as "Before & After Roofing
 * Photos" when the project data contains no photographs at all. The
 * card is now an honest project profile: an illustrated panel that is
 * labeled as an illustration, plus the project's scope, details, and
 * completion date from the data. The beforeImage/afterImage fields
 * remain in the data for the day Paul supplies real project photos;
 * nothing here renders them as photos in the meantime.
 */
export function GalleryProjectCard({ project }: GalleryProjectCardProps) {
  return (
    <article className="bg-secondary rounded-xl overflow-hidden border border-[#4a5040] hover:border-accent transition-colors duration-[150ms]">
      {/* Illustrated panel -- explicitly NOT a photograph */}
      <div className="aspect-[4/3] relative bg-gradient-to-br from-secondary to-[#33382b] flex items-center justify-center">
        <span className="absolute top-3 left-3 z-10 px-2 py-1 rounded bg-black/50 text-sm font-bold uppercase tracking-wider text-text-primary">
          Illustrated Profile
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 150"
          className="w-40 h-32 text-[#4a5040]"
          aria-hidden="true"
        >
          <polygon
            points="100,20 20,80 180,80"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <rect
            x="20"
            y="80"
            width="160"
            height="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <rect
            x="80"
            y="95"
            width="40"
            height="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="140"
            y="35"
            width="20"
            height="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="text-[1.75rem] font-heading font-bold text-text-primary">
          {project.title}
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed mt-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.projectDetails.map((detail) => (
            <span
              key={detail}
              className="inline-flex items-center bg-[#33382b] rounded-full px-3 py-1 text-sm text-text-secondary"
            >
              {detail}
            </span>
          ))}
        </div>
        <p className="text-text-secondary text-base mt-4">
          Completed {formatCompletionDate(project.completionDate)}
        </p>
      </div>
    </article>
  );
}
