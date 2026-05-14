import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "sector",   title: "Sector",   type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active",   value: "Active" },
          { title: "Prospect", value: "Prospect" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "summary",   title: "Summary",         type: "text", rows: 3 }),
    defineField({ name: "savingsCr", title: "Savings (₹ Cr)",  type: "number" }),
    defineField({ name: "logoUrl",   title: "Logo URL",         type: "url" }),
    defineField({
      name: "isPublic",
      title: "Show on website",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
