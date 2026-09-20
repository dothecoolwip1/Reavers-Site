"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { galleryPhotos } from "@/lib/site";

export function GalleryGrid({ limit }: { limit?: number }) {
  const photos = typeof limit === "number" ? galleryPhotos.slice(0, limit) : galleryPhotos;
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((value) => value === null ? 0 : (value + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setActive((value) => value === null ? 0 : (value - 1 + photos.length) % photos.length);
      }
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, photos.length]);

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <button
            type="button"
            className="gallery-card"
            key={photo.src}
            onClick={() => setActive(index)}
            aria-label={"Open image " + (index + 1)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              className="gallery-image"
            />
            <span className="gallery-number">{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      {active !== null ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Close photo viewer">×</button>
          <button className="lightbox-arrow left" type="button" onClick={() => setActive((active - 1 + photos.length) % photos.length)} aria-label="Previous photo">‹</button>
          <div className="lightbox-image-wrap">
            <Image
              src={photos[active].src}
              alt={photos[active].alt}
              fill
              sizes="95vw"
              className="lightbox-image"
              priority
            />
          </div>
          <button className="lightbox-arrow right" type="button" onClick={() => setActive((active + 1) % photos.length)} aria-label="Next photo">›</button>
          <p className="lightbox-caption">{photos[active].alt}</p>
        </div>
      ) : null}
    </>
  );
}
