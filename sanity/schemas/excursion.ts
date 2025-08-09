import { defineType, defineField } from "sanity";

export const excursions = defineType({
  name: "excursions",
  title: "Excursions",
  type: "document",
  fields: [
    defineField({
      name: "excursionName",
      title: "Excursion Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "excursionName" },
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
});
