"use client";

import { cn } from "@/lib/utils";

interface GoogleMapEmbedProps {
  query: string;
  title: string;
  className?: string;
  zoom?: number;
}

export function GoogleMapEmbed({
  query,
  title,
  className,
  zoom = 14,
}: GoogleMapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const encodedQuery = encodeURIComponent(query);

  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedQuery}&zoom=${zoom}`
    : `https://www.google.com/maps?q=${encodedQuery}&output=embed`;

  return (
    <div
      className={cn(
        "relative w-full aspect-video rounded-lg overflow-hidden bg-dominant",
        className,
      )}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
      <noscript>
        <p className="text-text-secondary text-lg p-4">
          Map could not be loaded. Visit us at 123 Summit Avenue, Jersey City,
          NJ 07304.
        </p>
      </noscript>
    </div>
  );
}
