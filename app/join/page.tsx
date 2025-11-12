"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"

export default function Page() {
  const [pending, start] = useTransition()
  const [ok, setOk] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    start(async () => {
      try {
        const res = await fetch("/api/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
        if (res.ok) setOk(true)
      } catch {}
    })
  }

  return (
    <div className="container py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Join</h1>
      {ok ? (
        <div className="rounded-xl border border-steel/30 p-4 text-steel">
          Thanks. We will reach out with next steps.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-4">
          <Input name="name" label="Name" required />
          <Input name="email" type="email" label="Email" required />
          <Input name="phone" type="tel" label="Phone" />
          <Input name="interest" label="Interest" placeholder="Fighter, marshal, volunteer" />
          <Textarea name="goals" label="Goals" rows={4} />
          <div className="flex gap-3">
            <Button type="submit" disabled={pending}>Submit</Button>
            <a href="/waivers" className="underline text-steel">Waiver and Info Sheet</a>
          </div>
        </form>
      )}
    </div>
  )
}
