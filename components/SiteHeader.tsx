"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="shell nav-shell">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <BrandMark className="brand-mark" />
          <span className="brand-copy">
            <strong>Red Deer Reavers</strong>
            <small>Armored Sport • Central Alberta</small>
          </span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-line" />
          <span className="menu-line" />
          <span className="menu-line" />
          <span className="sr-only">Toggle navigation</span>
        </button>

        <nav
          id="primary-nav"
          className={open ? "primary-nav is-open" : "primary-nav"}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/join" onClick={() => setOpen(false)}>
            Try a Practice
          </Link>
        </nav>
      </div>
    </header>
  );
}
