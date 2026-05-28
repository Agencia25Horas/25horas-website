import type { SchemaTypeDefinition } from "sanity";
import { niche } from "./niche";
import { pack } from "./pack";
import { portfolioItem } from "./portfolioItem";
import { siteContent } from "./siteContent";

export const schemaTypes: SchemaTypeDefinition[] = [
  niche,
  pack,
  portfolioItem,
  siteContent,
];
