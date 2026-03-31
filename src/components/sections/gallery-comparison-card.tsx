"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import type { GalleryProject } from "@/data/types";

interface GalleryComparisonCardProps {
  project: GalleryProject;
}

export function GalleryComparisonCard({ project }: GalleryComparisonCardProps) {
  return (
    <article className="bg-secondary rounded-xl overflow-hidden border border-[#4a5040] hover:border-accent transition-colors duration-[150ms]">
      {/* Comparison slider */}
      <div className="aspect-[4/3] relative bg-[#33382b]">
        <span className="absolute top-3 left-3 z-10 px-2 py-1 rounded bg-black/50 text-sm font-bold uppercase tracking-wider text-text-primary">
          Before
        </span>
        <span className="absolute top-3 right-3 z-10 px-2 py-1 rounded bg-black/50 text-sm font-bold uppercase tracking-wider text-text-primary">
          After
        </span>
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={project.beforeImage}
              alt={project.beforeAlt}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={project.afterImage}
              alt={project.afterAlt}
            />
          }
          defaultPosition={50}
          keyboardIncrement={5}
          style={{ width: "100%", height: "100%" }}
        />
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
      </div>
    </article>
  );
}
