import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Red Deer Reavers training, armor, events, and buhurt competition.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The part that is hard to explain in words."
        description="Training days, tournament moments, armor, chaos, and the people who make the Reavers what they are."
      />
      <section className="section shell">
        <GalleryGrid />
      </section>
    </>
  );
}
