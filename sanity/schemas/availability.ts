import { defineField, defineType } from "sanity";

export default defineType({
  name: "availability",
  title: "Availability",
  type: "document",
  fields: [
    defineField({
      name: "availableRooms",
      title: "Available Rooms",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "availableDates",
    //   title: "Available Dates",
    //   type: "array",
    //   of: [{ type: "date" }],
    //   validation: (Rule) => Rule.required(),
    // }),
  ],
});
