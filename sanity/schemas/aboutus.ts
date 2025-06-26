export const aboutus = {
  name: "aboutus",
  title: "About us",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "team",
      title: "Out Team",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "occupation",
              title: "Occupation",
              type: "string",
            },
            {
              name: "memberImage",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
  ],
};
