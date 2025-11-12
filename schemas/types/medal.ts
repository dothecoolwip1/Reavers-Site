import { defineType, defineField } from "sanity"

export default defineType({
  name: "medal",
  title: "Medal",
  type: "document",
  fields: [
    defineField({ name: "date", type: "date", validation: r => r.required() }),
    defineField({ name: "competitor", type: "string", validation: r => r.required() }),
    defineField({ name: "category", type: "string", options: { list: ["sword and shield","longsword","polearm or hafted two-handed weapon","sword and buckler","saber","3v3","5v5","10v10","16v16","pro fight"] }, validation: r => r.required() }),
    defineField({ name: "medal", type: "string", options: { list: ["gold","silver","bronze"] }, validation: r => r.required() }),
    defineField({ name: "event", type: "reference", to: [{ type: "event" }] })
  ],
  preview: {
    select: { competitor: "competitor", category: "category", medal: "medal", date: "date" },
    prepare(s) {
      return { title: `${s.competitor} • ${s.category}`, subtitle: `${s.medal} • ${s.date}` }
    }
  }
})
