import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function Page() {
  return (
    <section className="bg-steelTexture">
      <div className="container py-12 sm:py-16">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          Red Deer Reavers
          <span className="block text-orange-brand">Alberta’s Medieval Combat Team</span>
        </h1>
        <p className="mt-4 max-w-prose text-steel">
          Full contact. Real armour. Real teamwork. Join practices, learn the sport, or support the squad.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/join"><Button>Join</Button></Link>
          <Link href="/sport"><Button variant="secondary">Learn</Button></Link>
          <Link href="/donate"><Button variant="accent">Donate</Button></Link>
        </div>
        <div className="mt-8 rounded-2xl overflow-hidden shadow-soft">
          <Image
            src="/images/hero.jpg"
            alt="Armoured fighters of the Red Deer Reavers"
            width={1600}
            height={900}
            priority
          />
        </div>
      </div>
    </section>
  )
}
