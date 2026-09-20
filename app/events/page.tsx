import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events & Practice",
  description: "Red Deer Reavers weekly practice schedule, demos, tournaments, and ways to see buhurt in Central Alberta.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events & practice"
        title="The easiest way to understand buhurt is to see it."
        description="Weekly training is our constant. Tournament dates, rookie sessions, demos, and community appearances change throughout the year, so we keep the permanent schedule here and post time-sensitive updates on social media."
      />

      <section className="section shell event-layout">
        <div className="event-primary">
          <p className="eyebrow">Weekly training</p>
          <h2>{site.venue}</h2>
          <div className="schedule-stack large">
            {site.practice.map((slot) => (
              <div className="schedule-row" key={slot.day}>
                <strong>{slot.day}</strong>
                <span>{slot.time}</span>
              </div>
            ))}
          </div>
          <p className="fine-print">{site.venueFee}. Please message before arriving for your first visit.</p>
          <Link className="button primary" href="/join">Plan a first practice</Link>
        </div>

        <div className="event-stack">
          <article className="event-card">
            <span className="event-type">Newcomers</span>
            <h3>Rookie and trial sessions</h3>
            <p>
              We periodically make extra room for newcomers to try soft kit, handle
              equipment, ask questions, and get a closer look at the sport.
            </p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="text-link">Watch Instagram <span>→</span></a>
          </article>
          <article className="event-card">
            <span className="event-type">Community</span>
            <h3>Demos and educational visits</h3>
            <p>
              The team can support community events, homeschool groups, classes, parties,
              and other educational demonstrations when schedules allow.
            </p>
            <Link className="text-link" href="/join#contact">Ask about a demo <span>→</span></Link>
          </article>
          <article className="event-card">
            <span className="event-type">Competition</span>
            <h3>Tournaments and travel</h3>
            <p>
              Reavers athletes attend armored sport events around Alberta, Western Canada,
              and beyond. Current competition announcements are posted as dates are confirmed.
            </p>
            <a href={site.hacsa} target="_blank" rel="noreferrer" className="text-link">HACSA teams <span>→</span></a>
          </article>
        </div>
      </section>
    </>
  );
}
