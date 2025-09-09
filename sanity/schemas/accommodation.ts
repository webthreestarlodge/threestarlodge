import { defineType, defineField } from "sanity";

export const accommodation = defineType({
  name: "accommodation",
  title: "Accommodation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Room Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
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
      name: "bedType",
      title: "Bed type",
      type: "string",
      options: {
        list: [
          { title: "Twin", value: "Twin" },
          { title: "Queen", value: "Queen" },
          { title: "King", value: "King" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "occupancy",
      title: "Occupancy",
      type: "string",
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
      title: "Room Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [
        {
          type: "document",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "general",
      title: "General",
      type: "array",
      of: [
        {
          type: "document",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
