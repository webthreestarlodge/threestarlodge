import { defineType, defineField } from "sanity";

export const accordions = defineType({
  name: "accordions",
  title: "Accordions (FAQ)",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Id",
      type: "number",
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
