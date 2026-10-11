import { copyFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await rm(output, { recursive: true, force: true });
await mkdir(output);
// Publish only runtime assets, keeping backups and the unlinked resume private.
for (const name of ['index.html', 'styles.css', 'script.js', 'profile.png']) {
  await copyFile(new URL(name, root), new URL(name, output));
}
console.log(`Static output: ${fileURLToPath(output)}`);
