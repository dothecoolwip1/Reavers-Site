import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the purpose and culture behind the Red Deer Reavers buhurt team in Central Alberta.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Reavers"
        title="A small team with room to become something bigger."
        description="The Red Deer Reavers exist to give Central Alberta a place to train, compete, teach, and grow the sport of buhurt without pretending newcomers already know how any of this works."
      />

      <section className="section shell about-story">
        <div className="about-photo">
          <Image
            src="/gallery/fight-07.jpg"
            alt="Red Deer Reavers team at an armored sport event"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            className="cover-image"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">Why we exist</p>
          <h2>Build athletes. Build a team. Build the local scene.</h2>
          <p>
            Reavers is still a growing club. That means new people are not walking into a
            polished machine where everyone else has been doing this forever. They are
            joining something they can help shape.
          </p>
          <p>
            Our focus is adults right now, with a longer term goal of creating safe,
            age-appropriate opportunities for younger athletes as the club gains the
            people, equipment, coaching, and structure to do it properly.
          </p>
          <Link className="button primary" href="/join">Meet us at practice</Link>
        </div>
      </section>

      <section className="section shell values-grid">
        <article><span>01</span><h3>Hard training</h3><p>We take improvement seriously without pretending every session needs to be miserable.</p></article>
        <article><span>02</span><h3>Good teammates</h3><p>Reliability, respect, coachability, and helping each other matter as much as athletic talent.</p></article>
        <article><span>03</span><h3>Safe progression</h3><p>New athletes earn intensity progressively instead of being thrown into situations they are not ready for.</p></article>
        <article><span>04</span><h3>Community</h3><p>Demos, education, recruiting, fundraising, and local partnerships keep the sport visible and sustainable.</p></article>
      </section>
    </>
  );
}
