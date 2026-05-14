# The New Prince of Hard Times

By Kevin L. Michel

The New Prince of Hard Times, Copyright © 2026 Kevin L. Michel. All rights reserved.

A living manuscript website for `The New Prince of Hard Times`, built with Astro and Markdown content collections.

## Local Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## PDF Export

Generate the downloadable trade-book PDF after manuscript changes:

```sh
npm run book:pdf
```

The script builds the hidden `/book-print` route, creates `public/downloads/the-new-prince-hard-times-kevin-l-michel.pdf`, and rebuilds the static site so `dist/downloads/` contains the committed PDF asset.

## Paperback Cover Export

Generate the KDP full-wrap paperback cover PDF at release milestones:

```sh
npm run book:cover
```

The script builds the hidden `/cover-print` route and creates `production/covers/output/the-new-prince-hard-times-cover-wrap.pdf`. Cover assets are release files, not public site downloads, until the book reaches publication-candidate status.

## Render Static Site

- Build command: `npm install && npm run build`
- Publish directory: `dist`

Render does not generate the PDF. Commit the regenerated file under `public/downloads/` before deployment.

## Manuscript Structure

- `src/content/chapters`: public chapter drafts.
- `src/content/brief`: public-facing book concept, tone, and audience.
- `src/content/notes`: repo-only editorial notes and claim ledger for now.
- `public/downloads`: committed reader PDF snapshots.

The repository is the source of truth. Render serves the built static site.
