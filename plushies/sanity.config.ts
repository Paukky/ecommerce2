// sanity.config.js
import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import schemas from './schemas/schema'

export default defineConfig({
  title: "Plushies",
  projectId: "wdn8jrma",
  dataset: "production",
  plugins: [deskTool(),visionTool()],
  
  schema: {
    types: schemas,
  },
});
