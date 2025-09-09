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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "excursionName" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
});
