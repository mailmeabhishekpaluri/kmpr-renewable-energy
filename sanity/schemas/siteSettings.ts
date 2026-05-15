import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "phoneNumbers",
      title: "Phone Numbers",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "emails",
      title: "Email Addresses",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "slotsFilled",    title: "Slots Filled",    type: "number" }),
    defineField({ name: "slotsTotal",     title: "Slots Total",     type: "number" }),
    defineField({
      name: "plantSinceISO",
      title: "Plant Operational Since (ISO date)",
      type: "string",
      description: "e.g. 2024-01-01",
    }),
    defineField({
      name: "plantSpecs",
      title: "Plant Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
  ],
});
