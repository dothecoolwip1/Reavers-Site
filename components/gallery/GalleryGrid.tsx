import Image from "next/image"

export function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {[1,2,3].map(n => (
        <div key={n} className="rounded-xl overflow-hidden border border-white/10">
          <Image src={`/images/gallery/${n}.jpg`} alt={`Gallery ${n}`} width={800} height={600} />
        </div>
      ))}
    </div>
  )
}
