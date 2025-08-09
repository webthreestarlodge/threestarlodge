import { defineType, defineField } from "sanity";

export const islandEssentials = defineType({
  name: "islandEssentials",
  title: "Island Essentials",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
