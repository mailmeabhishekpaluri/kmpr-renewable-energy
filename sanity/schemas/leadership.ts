import { defineField, defineType } from "sanity";

export default defineType({
  name: "leadership",
  title: "Leadership",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "role",     title: "Role",       type: "string" }),
    defineField({ name: "photoUrl", title: "Photo URL",  type: "url" }),
    defineField({
      name: "credentialsBullets",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
  ],
});
