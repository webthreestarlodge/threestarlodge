import { defineType, defineField } from "sanity";

export const bookingSchema = defineType({
  name: "bookings",
  title: "Room Bookings",
  type: "document",
  fields: [
    defineField({
      name: "rooms",
      title: "Rooms",
      type: "reference",
      to: [{ type: "accommodation" }],
    }),
    defineField({
      name: "fromDate",
      title: "From Date",
      type: "date",
    }),
    defineField({
      name: "toDate",
      title: "To Date",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "rooms.title",
      from: "fromDate",
      to: "toDate",
      media: "rooms.coverImage",
    },
    prepare({ title, from, to, media }) {
      return {
        title: title || "No room selected",
        subtitle: `From: ${from || "No date selected"} To: ${to || "No date selected"}`,
        media: media || null,
      };
    },
  },
});
