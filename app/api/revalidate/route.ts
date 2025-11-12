import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function POST(req: Request) {
  const { tag } = await req.json()
  if (typeof tag === "string") {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true })
  }
  return NextResponse.json({ revalidated: false }, { status: 400 })
}
