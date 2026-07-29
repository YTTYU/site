import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

// Not wired up to a live project yet (client chose to defer Sanity — see
// sanity/README.md). Fill in SANITY_PROJECT_ID / SANITY_DATASET once a
// project exists, then `npx sanity dev` runs the Studio locally.
export default defineConfig({
  name: 'jagger-garage',
  title: 'Jagger Garage — P-4',
  projectId: process.env.SANITY_PROJECT_ID || 'PLACEHOLDER_PROJECT_ID',
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
