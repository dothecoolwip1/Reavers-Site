import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { GalleryGrid } from "@/components/GalleryGrid";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image
          src="/gallery/fight-01.jpg"
          alt="Armored buhurt athletes competing"
          fill
          priority
          sizes="100vw"
          className="hero-photo"
        />
        <div className="hero-scrim" />
        <div className="hero-glow" />
        <div className="shell hero-content">
          <div className="hero-kicker">
            <span className="kicker-line" />
            Central Alberta • HACSA
          </div>
          <div className="hero-title-row">
            <BrandMark className="hero-mark" />
            <div>
              <h1>Built for the list.</h1>
              <p className="hero-subtitle">Built for each other.</p>
            </div>
          </div>
          <p className="hero-copy">
            Red Deer Reavers is a Central Alberta buhurt team training full contact
            armored sport. No medieval résumé required. Show up curious and ready to work.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/join">Try a practice</Link>
            <Link className="button ghost" href="/sport">See how buhurt works</Link>
          </div>
          <div className="hero-facts" aria-label="Team quick facts">
            <div><strong>18+</strong><span>Current program</span></div>
            <div><strong>2×</strong><span>Weekly practices</span></div>
            <div><strong>0</strong><span>Experience needed</span></div>
          </div>
        </div>
      </section>

      <section className="signal-strip">
        <div className="shell signal-grid">
          <div>
            <span className="signal-label">Practice</span>
            <strong>Wed 5:30 to 8 • Sun 5 to 8</strong>
          </div>
          <div>
            <span className="signal-label">Home base</span>
            <strong>{site.venue}</strong>
          </div>
          <div>
            <span className="signal-label">First step</span>
            <strong>Come watch or try a session</strong>
          </div>
        </div>
      </section>

      <section className="section shell split-intro">
        <div>
          <p className="eyebrow">What we actually do</p>
          <h2 className="display-heading">History inspired. Very much alive.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Buhurt is a modern contact sport fought in historically inspired steel armor.
            Teams compete inside a fenced arena called the list, using controlled striking,
            grappling, trips, pressure, and teamwork under a defined ruleset.
          </p>
          <p>
            The Reavers train the pieces before the spectacle: conditioning, movement,
            soft kit, clinch work, equipment familiarity, communication, and eventually
            armored rounds when you are ready.
          </p>
          <Link className="text-link" href="/sport">Learn the sport <span>→</span></Link>
        </div>
      </section>

      <section className="section shell card-band">
        <article className="feature-card orange">
          <span className="card-index">01</span>
          <h3>Start without armor</h3>
          <p>
            New people begin with the team, the movement, and the basics. Loaner gear is
            limited, so nobody expects you to arrive with a full kit.
          </p>
        </article>
        <article className="feature-card purple">
          <span className="card-index">02</span>
          <h3>Train at your level</h3>
          <p>
            Soft kit and controlled drills let you build confidence and fitness before
            moving into more demanding training.
          </p>
        </article>
        <article className="feature-card red">
          <span className="card-index">03</span>
          <h3>Join a crew</h3>
          <p>
            The sport is hard. The culture does not need to be. We want dependable people
            who can train hard, learn, laugh, and help the team grow.
          </p>
        </article>
      </section>

      <section className="section practice-panel">
        <div className="shell practice-grid">
          <div className="practice-photo-wrap">
            <Image
              src="/gallery/fight-06.jpg"
              alt="Reavers training in armor"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="practice-photo"
            />
            <div className="photo-badge">
              <span>Central Alberta</span>
              <strong>Come see it in person.</strong>
            </div>
          </div>
          <div className="practice-copy">
            <p className="eyebrow">Practice with the Reavers</p>
            <h2>Curious beats prepared.</h2>
            <p>
              You do not need to know the rules, own armor, or be in tournament shape.
              Message us before practice and we will tell you what to bring and what the
              night looks like.
            </p>
            <div className="schedule-stack">
              {site.practice.map((slot) => (
                <div className="schedule-row" key={slot.day}>
                  <strong>{slot.day}</strong>
                  <span>{slot.time}</span>
                </div>
              ))}
            </div>
            <p className="fine-print">
              Indoor venue fee: {site.venueFee}. HACSA insurance is handled after you
              decide you want to commit.
            </p>
            <Link className="button primary" href="/join">Plan your first visit</Link>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Inside the Reavers</p>
            <h2>Steel, sweat, road trips, and good stories.</h2>
          </div>
          <Link className="text-link" href="/gallery">Open full gallery <span>→</span></Link>
        </div>
        <GalleryGrid limit={6} />
      </section>

      <section className="section shell">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Your first practice is the easy part</p>
            <h2>You only have to show up once to find out.</h2>
            <p>
              Come watch, ask questions, try the beginner work, and see whether the team
              feels right before making any big commitment.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="button light" href="/join">Start here</Link>
            <a className="button outline-light" href={site.instagram} target="_blank" rel="noreferrer">
              Message on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
