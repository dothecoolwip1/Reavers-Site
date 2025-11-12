import { defineType, defineField } from "sanity"

export default defineType({
  name: "match",
  title: "Match",
  type: "document",
  fields: [
    defineField({ name: "date", type: "date", validation: r => r.required() }),
    defineField({ name: "competitor", type: "string", validation: r => r.required() }),
    defineField({ name: "category", type: "string", options: { list: ["sword and shield","longsword","polearm or hafted two-handed weapon","sword and buckler","saber","3v3","5v5","10v10","16v16","pro fight"] }, validation: r => r.required() }),
    defineField({ name: "type", type: "string", options: { list: ["duel","melee"] }, validation: r => r.required() }),
    defineField({ name: "result", type: "string", options: { list: ["W","L"] } }),
    defineField({ name: "scoreFor", type: "number" }),
    defineField({ name: "scoreAgainst", type: "number" }),
    defineField({ name: "event", type: "reference", to: [{ type: "event" }] }),
    defineField({ name: "notes", type: "text" })
  ],
  preview: {
    select: { competitor: "competitor", category: "category", type: "type", f: "scoreFor", a: "scoreAgainst", r: "result" },
    prepare(s) {
      const score = s.f != null && s.a != null ? `${s.f}-${s.a}` : s.r || ""
      return { title: `${s.competitor} • ${s.category}`, subtitle: `${s.type} ${score}` }
    }
  }
})
