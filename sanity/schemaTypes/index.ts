import { type SchemaTypeDefinition } from "sanity";
import { hero } from "../schemas/hero";
import { accommodation } from "../schemas/accommodation";
import { bannerImages } from "../schemas/bannerImages";
import { excursions } from "../schemas/excursion";
import { accordions } from "../schemas/accordions";
import { aboutus } from "../schemas/aboutus";
import { islandEssentials } from "../schemas/islandEssentials";
import availability from "../schemas/availability";
import { gallery } from "../schemas/gallery";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    accommodation,
    bannerImages,
    excursions,
    accordions,
    aboutus,
    islandEssentials,
    availability,
    gallery,
  ],
};
