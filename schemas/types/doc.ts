import { defineType, defineField } from "sanity"

export default defineType({
  name: "doc",
  title: "Document",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: r => r.required() }),
    defineField({ name: "file", type: "file", validation: r => r.required() }),
    defineField({ name: "description", type: "text" })
  ]
})
