export const excursions = {
  name: "excursions",
  title: "Excursions",
  type: "document",
  fields: [
    {
      name: "excursionName",
      title: "Excursion Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "excursionName" },
    },
    {
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
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
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
  ],
};
