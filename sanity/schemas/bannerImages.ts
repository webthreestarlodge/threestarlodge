export const bannerImages = {
  name: "bannerImages",
  title: "Banner Images",
  type: "document",
  fields: [
    {
      name: "pageName",
      title: "Page Name",
      type: "string",
    },
    {
      name: "imageId",
      title: "Image Id",
      type: "number",
    },
    {
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
