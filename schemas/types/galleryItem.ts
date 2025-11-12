import { defineType, defineField } from "sanity"

export default defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "image", type: "image", validation: r => r.required() }),
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "event", type: "reference", to: [{ type: "event" }] }),
    defineField({ name: "featured", type: "boolean" })
  ]
})
