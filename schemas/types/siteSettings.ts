import { defineType, defineField } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string" }),
    defineField({ name: "siteDescription", type: "text" }),
    defineField({ name: "socialImage", type: "image" }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "label", type: "string" },
        { name: "url", type: "url" }
      ]}]
    })
  ]
})
