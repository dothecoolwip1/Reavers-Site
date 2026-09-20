import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the Reavers",
  description: "How to try your first Red Deer Reavers buhurt practice in Central Alberta.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the Reavers"
        title="Do not buy armor first."
        description="Come meet us first. See a practice, try the beginner work, ask too many questions, and decide whether you actually enjoy the people and the sport before spending serious money."
      >
        <a className="button primary" href={site.instagram} target="_blank" rel="noreferrer">Message us on Instagram</a>
      </PageHero>

      <section className="section shell join-grid">
        <div>
          <p className="eyebrow">Your first visit</p>
          <h2>Keep it simple.</h2>
          <div className="step-list">
            <div><span>1</span><div><strong>Message us first</strong><p>Tell us your name, that you are new, and which practice you want to attend.</p></div></div>
            <div><span>2</span><div><strong>Wear gym clothes</strong><p>Bring clean indoor shoes, water, comfortable athletic clothing, and anything you normally need for a workout.</p></div></div>
            <div><span>3</span><div><strong>Meet the room</strong><p>We will explain the session, show you the space, and make sure you know what is appropriate for your experience level.</p></div></div>
            <div><span>4</span><div><strong>Try what makes sense</strong><p>Loaner equipment is limited and fit varies. You can still learn plenty without being put into full armor.</p></div></div>
          </div>
        </div>

        <aside className="join-card">
          <p className="eyebrow">Practice details</p>
          <h3>{site.venue}</h3>
          {site.practice.map((slot) => (
            <div className="mini-row" key={slot.day}>
              <span>{slot.day}</span><strong>{slot.time}</strong>
            </div>
          ))}
          <hr />
          <div className="mini-row"><span>Venue fee</span><strong>$10 / practice</strong></div>
          <div className="mini-row"><span>Experience</span><strong>None required</strong></div>
          <div className="mini-row"><span>Current program</span><strong>Adults 18+</strong></div>
          <p className="fine-print">
            Once you decide to commit, HACSA insurance is currently {site.insurance.replace("$100 HACSA insurance once you decide to commit to training with the team", "$100")}.
          </p>
        </aside>
      </section>

      <section id="contact" className="section shell">
        <div className="contact-panel">
          <div>
            <p className="eyebrow">Not ready to train?</p>
            <h2>There are other ways into the community.</h2>
            <p>
              Follow events, come watch, ask about a demonstration, volunteer around a
              local event, or simply message the team with questions.
            </p>
          </div>
          <div className="cta-actions">
            <a className="button light" href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a className="button outline-light" href={site.hacsa} target="_blank" rel="noreferrer">HACSA</a>
          </div>
        </div>
      </section>
    </>
  );
}
