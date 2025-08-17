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
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
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
    }),
    defineField({
      name: "occupancy",
      title: "Occupancy",
      type: "string",
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
            }),
          ],
        },
      ],
    }),
  ],
});
