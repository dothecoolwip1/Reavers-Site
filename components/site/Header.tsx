"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/events", label: "Events" },
  { href: "/scoreboard", label: "Scoreboard" },
  { href: "/join", label: "Join" },
  { href: "/donate", label: "Donate" },
  { href: "/sport", label: "Sport" },
  { href: "/waivers", label: "Waivers" },
  { href: "/social", label: "Social" },
  { href: "/gallery", label: "Gallery" }
]

export function Header() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="font-bold">Red Deer Reavers</Link>
        <nav className="hidden md:flex gap-5">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "text-orange-brand" : "text-steel hover:text-white"}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <details>
            <summary className="cursor-pointer">Menu</summary>
            <div className="mt-2 flex flex-col gap-2 p-3 rounded-xl bg-ink border border-white/10">
              {links.map(l => (
                <Link key={l.href} href={l.href} className="text-steel hover:text-white">{l.label}</Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
