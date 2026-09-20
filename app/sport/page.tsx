import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "The Sport",
  description: "A plain-language introduction to buhurt, training, equipment, match formats, and safety.",
};

export default function SportPage() {
  return (
    <>
      <PageHero
        eyebrow="Buhurt 101"
        title="Medieval armor. Modern sport."
        description="Buhurt is full contact competition in historically inspired armor. It looks chaotic from the rail. Underneath it is conditioning, technique, equipment standards, rules, teamwork, and a lot of repetition."
      >
        <Link className="button primary" href="/join">Try a practice</Link>
      </PageHero>

      <section className="section shell article-grid">
        <article className="content-card wide">
          <p className="eyebrow">The short version</p>
          <h2>Win the position. Stay on your feet. Help your team.</h2>
          <p>
            In team melees, athletes work together to put opponents down while staying
            upright themselves. Legal contact can include controlled strikes, grappling,
            trips, throws, body pressure, and rail work. Exact rules depend on the event
            and ruleset.
          </p>
        </article>
        <article className="content-card">
          <span className="big-number">01</span>
          <h3>Armor</h3>
          <p>
            Competition equipment is based on historical armor and must meet the ruleset
            used by the event. Fit, mobility, maintenance, and inspection matter.
          </p>
        </article>
        <article className="content-card">
          <span className="big-number">02</span>
          <h3>Training</h3>
          <p>
            New athletes build fundamentals in normal gym clothing and soft kit before
            adding the weight, heat, and restricted vision of full armor.
          </p>
        </article>
        <article className="content-card">
          <span className="big-number">03</span>
          <h3>Teamwork</h3>
          <p>
            Melee is not a collection of solo fights. Communication, positioning, support,
            pressure, and knowing when to disengage can matter more than raw strength.
          </p>
        </article>
        <article className="content-card">
          <span className="big-number">04</span>
          <h3>Safety</h3>
          <p>
            Safety depends on legal equipment, inspections, trained officials, controlled
            practice progression, clear stop commands, and athletes who respect the rules.
          </p>
        </article>
      </section>

      <section className="section shell">
        <div className="timeline-panel">
          <p className="eyebrow">How a beginner progresses</p>
          <div className="timeline">
            <div><span>1</span><strong>Meet the team</strong><p>Watch a practice, ask questions, and learn how the room runs.</p></div>
            <div><span>2</span><strong>Build movement</strong><p>Conditioning, footwork, balance, clinch basics, and safe falling.</p></div>
            <div><span>3</span><strong>Add soft kit</strong><p>Controlled drills with safer training equipment and increasing intensity.</p></div>
            <div><span>4</span><strong>Learn armor</strong><p>Fit, movement, communication, visibility, heat management, and maintenance.</p></div>
            <div><span>5</span><strong>Earn harder rounds</strong><p>Progress when your skills, fitness, equipment, and coaches say you are ready.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
