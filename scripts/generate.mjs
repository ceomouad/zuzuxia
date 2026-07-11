// Slices abde.jpg (a 1024x1536, 5-column contact sheet of 47 sneakers)
// into individual product images and writes the seed data JSON.
//
// Run with:  npm run seed
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "abde.jpg");
const OUT_IMG = path.join(ROOT, "public", "products");
const OUT_DATA = path.join(ROOT, "data", "products.json");

// Products in reading order (row-major, 5 per row). Prices from the sheet.
const RAW = [
  { n: 1, name: "New Balance FuelCell Racer", brand: "New Balance", price: 55, used: 55 },
  { n: 2, name: "Nike Zoom Rival Spike", brand: "Nike", price: 55, used: 55 },
  { n: 3, name: "Nike Zoom S10", brand: "Nike", price: 55, used: 35 },
  { n: 4, name: "Nike Zoom Rival Sky", brand: "Nike", price: 55, used: 35 },
  { n: 5, name: "Nike Zoom M10", brand: "Nike", price: 55, used: 35 },
  { n: 6, name: "Nike Zoom Rival Sand", brand: "Nike", price: 55, used: 35 },
  { n: 7, name: "Nike Air Zoom Superfly 2", brand: "Nike", price: 80, used: 50 },
  { n: 8, name: "Nike Zoom Dragonfly", brand: "Nike", price: 105, used: 65 },
  { n: 9, name: "Nike Zoom Dragonfly 2", brand: "Nike", price: 125, used: 80 },
  { n: 10, name: "Nike Zoom Victory", brand: "Nike", price: 115, used: 65 },
  { n: 11, name: "Nike Zoom Victory 2", brand: "Nike", price: 145, used: 85 },
  { n: 12, name: "Nike Air Zoom LJ Elite", brand: "Nike", price: 185, used: 105 },
  { n: 13, name: "Nike Air Zoom TJ Elite", brand: "Nike", price: 175, used: 85 },
  { n: 17, name: "Nike Zoom Rival XC", brand: "Nike", price: 55, used: 55 },
  { n: 18, name: "Nike Zoom Rival Dune", brand: "Nike", price: 55, used: 55 },
  { n: 19, name: "Nike Air Zoom HJ Elite", brand: "Nike", price: 175, used: 105 },
  { n: 20, name: "Nike Air Zoom Maxfly 2", brand: "Nike", price: 205, used: 125 },
  { n: 21, name: "Nike Air Max 1 Racer", brand: "Nike", price: 225, used: 85 },
  { n: 22, name: "Adidas Adizero Finesse 4", brand: "Adidas", price: 185, used: 125 },
  { n: 23, name: "Adidas Adizero Finesse 1", brand: "Adidas", price: 55, used: 35 },
  { n: 24, name: "Adidas Adizero Finesse 2", brand: "Adidas", price: 85, used: 50 },
  { n: 25, name: "Adidas Adizero Finesse 3", brand: "Adidas", price: 155, used: 95 },
  { n: 26, name: "Adidas Adizero SP1", brand: "Adidas", price: 105, used: 50 },
  { n: 27, name: "Adidas Adizero Prime SP2", brand: "Adidas", price: 305, used: 155 },
  { n: 28, name: "Adidas Adizero SP3", brand: "Adidas", price: 193, used: 125 },
  { n: 29, name: "Adidas Adizero SP4", brand: "Adidas", price: 205, used: 145 },
  { n: 30, name: "Adidas Adizero Ambition", brand: "Adidas", price: 145, used: 85 },
  { n: 31, name: "Adidas Adizero Ambition 2", brand: "Adidas", price: 165, used: 125 },
  { n: 32, name: "Adidas Adizero LJ", brand: "Adidas", price: 185, used: 105 },
  { n: 33, name: "Adidas Adizero HJ", brand: "Adidas", price: 205, used: 105 },
  { n: 34, name: "Adidas Adizero Avanti 1", brand: "Adidas", price: 155, used: 85 },
  { n: 35, name: "Adidas Adizero TJ", brand: "Adidas", price: 155, used: 95 },
  { n: 36, name: "Nike Zoom RJ Elite", brand: "Nike", price: 125, used: 80 },
  { n: 37, name: "Adidas Adizero Avanti 2", brand: "Adidas", price: 205, used: 125 },
  { n: 38, name: "Puma evoSPEED Nitro 100", brand: "Puma", price: 205, used: 135 },
  { n: 39, name: "Puma evoSPEED Nitro 400", brand: "Puma", price: 205, used: 135 },
  { n: 40, name: "Wolandi 911", brand: "Wolandi", price: 75, used: 35 },
  { n: 41, name: "Wolandi Rocket", brand: "Wolandi", price: 155, used: 85 },
  { n: 42, name: "Asics MetaSpeed MD2", brand: "Asics", price: 205, used: 165 },
  { n: 43, name: "Asics MetaSpeed MD", brand: "Asics", price: 155, used: 105 },
  { n: 44, name: "Asics MetaSprint SP1", brand: "Asics", price: 155, used: 95 },
  { n: 45, name: "Asics MetaSprint SP2", brand: "Asics", price: 225, used: 185 },
  { n: 46, name: "Asics MetaFly 3", brand: "Asics", price: 105, used: 65 },
  { n: 47, name: "Nike Zoom Fly 4 Pink", brand: "Nike", price: 105, used: 65 },
  { n: 48, name: "Nike Zoom Fly 4 White", brand: "Nike", price: 105, used: 65 },
  { n: 49, name: "Nike Zoom Fly 4 Teal", brand: "Nike", price: 105, used: 65 },
  { n: 50, name: "Nike Zoom Fly 4 Black", brand: "Nike", price: 105, used: 65 },
];

const FEATURED = new Set([21, 27, 20, 9, 45, 39, 42, 11]);
const SIZE_POOL = ["38", "39", "40", "41", "42", "43", "44", "45"];

function sizesFor(i) {
  // Deterministic, varied per product (always >= 4 sizes).
  const start = i % 3; // 0..2
  const end = SIZE_POOL.length - (i % 2); // trims last sometimes
  return SIZE_POOL.slice(start, end);
}

function descFor(p) {
  const perks = {
    Nike: "Featherlight Nike engineering with responsive Zoom cushioning built for explosive speed.",
    Adidas: "Adidas Adizero DNA — carbon-tuned propulsion and a locked-in fit for race day.",
    Puma: "Puma NITRO foam delivers springy energy return and a barely-there feel.",
    Asics: "Asics precision geometry and grippy outsole for confident turnover on the track.",
    "New Balance": "New Balance FuelCell responsiveness tuned for effortless tempo.",
    Wolandi: "Track-ready performance spike with an aggressive plate and secure lockdown.",
  };
  return `Authentic ${p.name}. ${perks[p.brand] || "Premium performance footwear."} 100% genuine, delivered anywhere in China with fast, reliable Instagram support.`;
}

// Detect the shoe's bounding box inside a grid cell by finding the largest
// contiguous vertical block of non-white pixels (title/price text form smaller
// separate blocks). Works regardless of the cell's exact offset or shoe color.
async function detectShoe(src, cell) {
  const { data, info } = await sharp(src)
    .extract(cell)
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;

  const isInk = (x, y) => {
    const o = (y * w + x) * ch;
    const r = data[o], g = data[o + 1], b = data[o + 2];
    // Non-white = part of a shoe or text glyph.
    return !(r > 238 && g > 238 && b > 238);
  };

  const rowInk = new Array(h).fill(0);
  for (let y = 0; y < h; y++) {
    let cnt = 0;
    for (let x = 0; x < w; x++) if (isInk(x, y)) cnt++;
    rowInk[y] = cnt;
  }

  // Contiguous runs of "inky" rows. A shoe is a wide, tall block; title/price
  // text lines are thin. Break runs on any blank row so text stays separate.
  const minRow = Math.max(6, w * 0.05);
  const runs = [];
  let start = -1;
  for (let y = 0; y < h; y++) {
    if (rowInk[y] > minRow) {
      if (start < 0) start = y;
    } else if (start >= 0) {
      runs.push([start, y - 1]);
      start = -1;
    }
  }
  if (start >= 0) runs.push([start, h - 1]);
  if (!runs.length) return { left: cell.left, top: cell.top, width: w, height: h };

  // The shoe = the tallest run (text lines are short). Ties broken by ink mass.
  let best = runs[0], bestH = -1, bestScore = -1;
  for (const [s, e] of runs) {
    const height = e - s + 1;
    let score = 0;
    for (let y = s; y <= e; y++) score += rowInk[y];
    if (height > bestH || (height === bestH && score > bestScore)) {
      bestH = height; bestScore = score; best = [s, e];
    }
  }
  let [y0, y1] = best;

  // Horizontal extent within that vertical band.
  let x0 = w, x1 = 0;
  for (let y = y0; y <= y1; y++)
    for (let x = 0; x < w; x++)
      if (isInk(x, y)) { if (x < x0) x0 = x; if (x > x1) x1 = x; }
  if (x1 < x0) { x0 = 0; x1 = w - 1; }

  const pad = 4;
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
  x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);

  return {
    left: cell.left + x0,
    top: cell.top + y0,
    width: Math.max(1, x1 - x0 + 1),
    height: Math.max(1, y1 - y0 + 1),
  };
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error("Source image not found:", SRC);
    process.exit(1);
  }
  fs.mkdirSync(OUT_IMG, { recursive: true });
  fs.mkdirSync(path.dirname(OUT_DATA), { recursive: true });

  const meta = await sharp(SRC).metadata();
  const W = meta.width, H = meta.height;
  const COLS = 5, ROWS = 10;

  const products = [];
  const base = Date.parse("2026-07-01T09:00:00Z");

  for (let i = 0; i < RAW.length; i++) {
    const p = RAW[i];
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    const x0 = Math.round((c * W) / COLS);
    const x1 = Math.round(((c + 1) * W) / COLS);
    const y0 = Math.round((r * H) / ROWS);
    const y1 = Math.round(((r + 1) * H) / ROWS);
    const cw = x1 - x0;
    const ch = y1 - y0;

    // Search window: shifted down into the band where shoes sit, so the shoe is
    // fully contained regardless of the row's exact offset. detectShoe() then
    // isolates the shoe's bounding box (ignoring title/price text blocks).
    const searchTop = Math.max(0, y0 + Math.round(ch * 0.12));
    const searchH = Math.min(H - searchTop, Math.round(ch * 1.0));
    const searchCell = { left: x0, top: searchTop, width: cw, height: searchH };

    const file = `p${p.n}.jpg`;
    const outPath = path.join(OUT_IMG, file);

    let region;
    try {
      region = await detectShoe(SRC, searchCell);
    } catch {
      region = { left: x0 + Math.round(cw * 0.02), top: y0 + Math.round(ch * 0.42), width: Math.round(cw * 0.96), height: Math.round(ch * 0.55) };
    }

    await sharp(SRC)
      .extract(region)
      .resize({ width: 900, height: 680, fit: "contain", background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(outPath);

    products.push({
      id: `sku-${String(p.n).padStart(3, "0")}`,
      name: p.name,
      brand: p.brand,
      category: p.brand,
      price: p.price,
      priceUsed: p.used,
      images: [`/products/${file}`],
      description: descFor(p),
      sizes: sizesFor(i),
      featured: FEATURED.has(p.n),
      createdAt: new Date(base + i * 3600 * 1000).toISOString(),
    });
  }

  fs.writeFileSync(OUT_DATA, JSON.stringify(products, null, 2));
  console.log(`Sliced ${products.length} images -> public/products/`);
  console.log(`Wrote seed data -> data/products.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
