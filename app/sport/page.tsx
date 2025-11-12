import Link from "next/link"

export default function Page() {
  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold">About the Sport</h1>
      <p className="text-steel max-w-prose">
        Medieval armoured combat is a full contact team sport using steel armour and blunted weapons.
        Safety gear and coaching keep things controlled and competitive.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-steel/30 p-4">
          <h2 className="font-semibold mb-2">IMCF</h2>
          <ul className="list-disc pl-6 text-steel space-y-1">
            <li>International competition focus</li>
            <li>Strict armour and weapon standards</li>
            <li>Duel and melee formats</li>
          </ul>
          <Link href="https://www.imcfederation.org" className="underline mt-2 inline-block">Official rules</Link>
        </div>
        <div className="rounded-xl border border-steel/30 p-4">
          <h2 className="font-semibold mb-2">Buhurt International</h2>
          <ul className="list-disc pl-6 text-steel space-y-1">
            <li>Large team melees like 5v5 and 10v10</li>
            <li>Strong club league culture</li>
            <li>Clear safety and conduct policies</li>
          </ul>
          <Link href="https://buhurt.com" className="underline mt-2 inline-block">Official rules</Link>
        </div>
      </div>
    </div>
  )
}
