import { type SchemaTypeDefinition } from "sanity";
import { hero } from "../schemas/hero";
import { accommodation } from "../schemas/accommodation";
import { bannerImages } from "../schemas/bannerImages";
import { excursions } from "../schemas/excursion";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, accommodation, bannerImages, excursions],
};
