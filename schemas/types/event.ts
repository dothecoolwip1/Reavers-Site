import { defineType, defineField } from "sanity"

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: r => r.required() }),
    defineField({ name: "date", type: "date", validation: r => r.required() }),
    defineField({ name: "time", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "type", type: "string", options: { list: ["practice", "demo", "tournament"] }, validation: r => r.required() }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "heroImage", type: "image" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "published", type: "boolean", initialValue: true })
  ],
  preview: {
    select: { title: "title", date: "date", location: "location", type: "type" }
  }
})
