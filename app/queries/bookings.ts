import { client } from "@/sanity/lib/client";

export const fetchBookingsWithRooms = async () => {
  const query = `*[_type == "bookings"]{
    _id,
    fromDate,
    toDate,
    rooms->{
      _id,
      title
    }
  }`;
  // return await client.fetch(query);
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
};
