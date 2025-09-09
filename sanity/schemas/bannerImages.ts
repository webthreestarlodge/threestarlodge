import { defineType, defineField } from "sanity";

export const bannerImages = defineType({
  name: "bannerImages",
  title: "Banner Images",
  type: "document",
  fields: [
    defineField({
      name: "pageName",
      title: "Page Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageId",
      title: "Image Id",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
});
