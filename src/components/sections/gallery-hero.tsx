interface GalleryHeroProps {
  projectCount: number;
}

export function GalleryHero({ projectCount }: GalleryHeroProps) {
  return (
    <section className="bg-dominant py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-[2.5rem] lg:text-[3rem] font-heading font-bold text-text-primary leading-[1.1]">
          Our Roofing Projects
        </h1>
        <p className="text-lg text-text-secondary mt-4 max-w-2xl mx-auto">
          Browse {projectCount} completed projects across Hudson County. Drag
          the slider to compare before and after.
        </p>
      </div>
    </section>
  );
}
