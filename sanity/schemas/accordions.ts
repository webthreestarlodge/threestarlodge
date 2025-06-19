export const accordions = {
  name: "accordions",
  title: "Accordions (FAQ)",
  type: "document",
  fields: [
    {
      name: "id",
      title: "Id",
      type: "number",
    },
    {
      name: "question",
      title: "Question",
      type: "string",
    },
    {
      name: "answer",
      title: "Answer",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
