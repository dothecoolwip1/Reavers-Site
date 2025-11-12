import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  // TODO: send with Resend and write to Sanity
  return NextResponse.json({ ok: true })
}
