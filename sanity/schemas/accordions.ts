import { defineType, defineField } from "sanity";

export const accordions = defineType({
  name: "accordions",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Id",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
