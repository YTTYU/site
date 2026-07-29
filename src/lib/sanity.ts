import { createClient } from '@sanity/client';

// Feature-flagged: the site currently reads content from
// src/content/data/*.ts (see copy.ts), not from Sanity — the client asked to
// defer the CMS connection. This stub exists so switching over later is a
// small, mechanical change instead of a rewrite:
//
//   1. Create a Sanity project (see ../sanity/README.md), set the env vars below.
//   2. Push content matching sanity/schemaTypes (Studio: `npx sanity dev`).
//   3. In each src/components/sections/*.astro, replace the
//      `import { x } from '../../content/data/copy'` with a call to
//      `getSection('x')` from this file, awaited at the top of the component's
//      frontmatter (Astro frontmatter supports top-level await).
//
// isSanityConfigured stays false until real env vars are present, so nothing
// here runs at build time by default.

export const isSanityConfigured = Boolean(
  import.meta.env.SANITY_PROJECT_ID && import.meta.env.SANITY_PROJECT_ID !== 'PLACEHOLDER_PROJECT_ID'
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: import.meta.env.SANITY_PROJECT_ID,
      dataset: import.meta.env.SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null;

export async function getSection(sectionId: string) {
  if (!sanityClient) {
    throw new Error(
      `Sanity is not configured (SANITY_PROJECT_ID missing) — cannot fetch section "${sectionId}". ` +
        'Either set the env vars or keep reading from src/content/data/copy.ts.'
    );
  }
  return sanityClient.fetch(`*[_type == "section" && sectionId == $sectionId][0]`, { sectionId });
}
