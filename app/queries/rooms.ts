import { client } from "@/sanity/lib/client";

export const rooms = async () => {
  const query = `*[_type == "accommodation"]{
    _id,
     title
  }`;
  return await client.fetch(query);
};
