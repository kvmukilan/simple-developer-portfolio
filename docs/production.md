# Deployment

Run `npm test` to validate JavaScript syntax, local files, anchors, and duplicate IDs, then `npm run build`. Publish `dist/`, which contains only index.html, styles.css, script.js, and profile.png. The repository's backup site and unlinked resume are excluded from this deployed artifact. They remain present in GitHub.

Vercel configuration sets this build command and output directory, adds security headers, requires HTML revalidation, and caches stable assets for one hour with revalidation. Use the existing Git integration for branch previews and require the Verify static deployment check before promoting production.

Check navigation, terminal commands, contact links, and mobile layout in the preview. Roll back to the previous deployment if needed. Static validation does not verify external URLs or browser rendering.
