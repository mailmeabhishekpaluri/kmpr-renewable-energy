import { defineField, defineType } from "sanity";

export default defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "label" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "headline",    title: "Headline",    type: "string" }),
        defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "headlineStat",
      title: "Headline Stat",
      type: "string",
      description: "e.g. 'Average steel plant saves Rs. 3–5 crore/year'",
    }),
    defineField({
      name: "featuredCaseStudy",
      title: "Featured Case Study",
      type: "reference",
      to: [{ type: "caseStudy" }],
    }),
    defineField({
      name: "faq",
      title: "Industry FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer",   title: "Answer",   type: "text", rows: 3 }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
});
