// Converts white-background product JPGs into transparent-background PNGs so
// they sit naturally on the dark showcase theme.
//
// Method: flood-fill from the image borders across "near-white / light grey"
// pixels (the studio background). Only background-connected pixels become
// transparent, so white shoe parts (midsoles, laces) are preserved. Edge
// pixels get partial alpha for a softer cut.
//
// Run: node scripts/cutout.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "products");
const DATA = path.join(process.cwd(), "data", "products.json");

const isBg = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return min >= 222 && max - min <= 24; // near-white, low saturation
};

async function cutout(file) {
  const src = path.join(DIR, file);
  const { data, info } = await sharp(src)
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;

  const bg = new Uint8Array(w * h); // 1 = background
  const qx = new Int32Array(w * h);
  const qy = new Int32Array(w * h);
  let head = 0,
    tail = 0;

  const tryPush = (x, y) => {
    const idx = y * w + x;
    if (bg[idx]) return;
    const o = idx * c;
    if (isBg(data[o], data[o + 1], data[o + 2])) {
      bg[idx] = 1;
      qx[tail] = x;
      qy[tail] = y;
      tail++;
    }
  };

  for (let x = 0; x < w; x++) {
    tryPush(x, 0);
    tryPush(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    tryPush(0, y);
    tryPush(w - 1, y);
  }
  while (head < tail) {
    const x = qx[head],
      y = qy[head];
    head++;
    if (x > 0) tryPush(x - 1, y);
    if (x < w - 1) tryPush(x + 1, y);
    if (y > 0) tryPush(x, y - 1);
    if (y < h - 1) tryPush(x, y + 1);
  }

  // Build RGBA output; feather pixels that border the background.
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const o = idx * c;
      const t = idx * 4;
      out[t] = data[o];
      out[t + 1] = data[o + 1];
      out[t + 2] = data[o + 2];
      if (bg[idx]) {
        out[t + 3] = 0;
      } else {
        const nearBg =
          (x > 0 && bg[idx - 1]) ||
          (x < w - 1 && bg[idx + 1]) ||
          (y > 0 && bg[idx - w]) ||
          (y < h - 1 && bg[idx + w]);
        out[t + 3] = nearBg ? 150 : 255;
      }
    }
  }

  const dest = path.join(DIR, file.replace(/\.jpe?g$/i, ".png"));
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  return path.basename(dest);
}

const files = fs.readdirSync(DIR).filter((f) => /\.jpe?g$/i.test(f));
let done = 0;
for (const f of files) {
  await cutout(f);
  done++;
}
console.log(`cut out ${done} images -> transparent PNGs`);

// Point the catalog at the PNGs and drop the old JPGs.
const products = JSON.parse(fs.readFileSync(DATA, "utf8"));
for (const p of products) {
  p.images = p.images.map((src) =>
    src.startsWith("/products/") ? src.replace(/\.jpe?g$/i, ".png") : src
  );
}
fs.writeFileSync(DATA, JSON.stringify(products, null, 2));
for (const f of files) fs.unlinkSync(path.join(DIR, f));
console.log("updated data/products.json and removed old JPGs");
