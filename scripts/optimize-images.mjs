// Optimize + rename the new programme photos into web-friendly paths.
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdirSync, mkdirSync, unlinkSync, renameSync, existsSync, rmdirSync, statSync } from "fs";
import { join, extname } from "path";

const SRC = "public/images";

const folders = {
  "Community Infrastructure Project": "community-infrastructure",
  "Education": "education",
  "Lifeline Project livelihoods": "lifeline",
};

const slugify = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/whatsapp image (\d{4})-(\d{2})-(\d{2}).*/, "photo-$1-$2-$3")
    .replace(/^img[_-]?/i, "photo-")
    .replace(/^(\d{8})_(\d{6})$/, "photo-$1-$2")
    .replace(/^picture/, "photo-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

let skipped = [];
for (const [oldDir, newDir] of Object.entries(folders)) {
  const src = join(SRC, oldDir);
  const dst = join(SRC, newDir);
  if (!existsSync(src)) continue;
  mkdirSync(dst, { recursive: true });

  const seen = new Map();
  for (const file of readdirSync(src)) {
    const ext = extname(file).toLowerCase();
    if (ext === ".cr2") {
      skipped.push(file);
      continue;
    }
    let base = slugify(file);
    if (seen.has(base)) base = `${base}-${seen.get(base) + 1}`;
    seen.set(base, (seen.get(base) || 0) + 1);
    const out = join(dst, `${base}.jpg`);
    await sharp(join(src, file))
      .rotate() // honor EXIF orientation
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    const kb = Math.round(statSync(out).size / 1024);
    console.log(`${file} -> ${newDir}/${base}.jpg (${kb} KB)`);
    unlinkSync(join(src, file));
  }
  try { rmdirSync(src); } catch {}
}
if (skipped.length) console.log("SKIPPED (RAW/unsupported):", skipped);
console.log("Done.");
