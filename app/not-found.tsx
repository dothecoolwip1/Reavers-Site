import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1>That page left the list.</h1>
        <p>Head back to the Reavers home page and keep exploring.</p>
        <Link className="button primary" href="/">Back home</Link>
      </div>
    </section>
  );
}
