export const accommodation = {
  name: "accommodation",
  title: "Accommodation",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Room Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "bedType",
      title: "Bed type",
      type: "string",
      enum: ["Twin bed", "Queen bed", "King bed"],
      options: {
        list: [
          { title: "Twin", value: "Twin" },
          { title: "Queen", value: "Queen" },
          { title: "King", value: "King" },
        ],
      },
    },
    {
      name: "occupancy",
      title: "Occupancy",
      type: "string",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "images",
      title: "Room Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [
        {
          type: "document",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "facilities",
      title: "Facilities",
      type: "array",
      of: [
        {
          type: "document",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
