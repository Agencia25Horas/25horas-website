import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const projectId = "epe7jy8x";
const dataset = "production";
const apiVersion = "2025-01-01";

export default defineConfig({
  name: "25horas",
  title: "25 Horas Agency",
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
