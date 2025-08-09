import { defineType, defineField } from "sanity";

export const aboutus = defineType({
  name: "aboutus",
  title: "About us",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "team",
      title: "Out Team",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "occupation",
              title: "Occupation",
              type: "string",
            }),
            defineField({
              name: "memberImage",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
});
