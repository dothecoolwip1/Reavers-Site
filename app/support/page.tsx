import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support the Reavers",
  description: "Ways to support Red Deer Reavers training, community demonstrations, equipment, and competition travel.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support the Reavers"
        title="Help put more steel on the field."
        description="The Reavers are volunteer run. Support helps with training equipment, community demonstrations, event costs, and travel while keeping the barrier to trying the sport as low as we reasonably can."
      >
        <a className="button primary" href={site.instagram} target="_blank" rel="noreferrer">
          Ask about donating
        </a>
      </PageHero>

      <section className="section shell article-grid">
        <article className="content-card wide">
          <p className="eyebrow">Where support goes</p>
          <h2>Useful things, not fluff.</h2>
          <p>
            Contributions can help the club acquire shared training equipment, maintain
            practice resources, support educational demonstrations, cover event expenses,
            and reduce the cost of getting athletes to competition.
          </p>
        </article>

        <article className="content-card">
          <span className="big-number">01</span>
          <h3>Training equipment</h3>
          <p>Soft kit, pads, shields, list equipment, conditioning tools, and shared club gear.</p>
        </article>
        <article className="content-card">
          <span className="big-number">02</span>
          <h3>Community demos</h3>
          <p>Transport, setup materials, educational displays, and the practical costs of bringing buhurt into the community.</p>
        </article>
        <article className="content-card">
          <span className="big-number">03</span>
          <h3>Competition</h3>
          <p>Event fees, team logistics, and travel support when the club sends athletes beyond Central Alberta.</p>
        </article>
        <article className="content-card">
          <span className="big-number">04</span>
          <h3>Future growth</h3>
          <p>Resources that make the club safer, more sustainable, and better prepared to welcome new athletes.</p>
        </article>
      </section>

      <section className="section shell">
        <div className="contact-panel">
          <div>
            <p className="eyebrow">Individuals & local businesses</p>
            <h2>Want to help in a practical way?</h2>
            <p>
              Message the team and we can share the current donation or sponsorship options.
              We are keeping this page intentionally simple until an official online donation
              method is connected.
            </p>
          </div>
          <div className="cta-actions">
            <a className="button light" href={site.instagram} target="_blank" rel="noreferrer">
              Contact the team
            </a>
            <Link className="button outline-light" href="/events">See what we do</Link>
          </div>
        </div>
      </section>
    </>
  );
}
