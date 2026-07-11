# Zu Zu Xia — Premium Sneakers Store

A modern, mobile-first sneaker landing page for **foreigners living in China**.
Customers browse authentic sneakers and order via Instagram DM (no on-site
checkout). Built to feel as polished as Nike, StockX and GOAT.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
**Framer Motion**, dark/light mode, glassmorphism, scroll-reveal animations,
skeleton loading, and a hidden admin panel with full product CRUD.

---

## Quick start

```bash
npm install          # install dependencies
npm run seed         # slice abde.jpg into product images + seed data (already run)
npm run dev          # start the dev server → http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

### Environment variables (`.env.local`)

```env
ADMIN_PASSWORD=zuzuxia-admin                 # password for the /admin panel
NEXT_PUBLIC_INSTAGRAM_USERNAME=abderrv.hmvne # your Instagram handle for "Buy Now"
```

> Change `ADMIN_PASSWORD` before going live. See `.env.example` for the full list
> (including optional Supabase keys).

---

## Pages

| Route     | Description                                                            |
| --------- | --------------------------------------------------------------------- |
| `/`       | Home — hero, categories, featured products, about, how it works, reviews, FAQ, footer |
| `/shop`   | Full catalog with brand / size / price filters, search and sorting    |
| `/admin`  | Hidden dashboard — password login, add / edit / delete products, image upload |

### The "Buy Now" flow

Clicking **Buy Now** copies this message to the clipboard and opens your Instagram DM:

> Hi! I'm interested in buying the **{Product Name}** in size **{Selected Size}**. Is it available?

(Instagram doesn't allow pre-filling DM text via URL, so we copy it for one-tap paste.)

---

## Admin panel

1. Go to **`/admin`** and sign in with `ADMIN_PASSWORD`.
2. Add / edit / delete products, upload multiple images, change prices, sizes,
   descriptions and mark **featured** products.
3. Uploaded images are saved to `public/uploads/`; the catalog reads live from
   the data store, so the storefront updates automatically.

---

## Product images

All 47 products were sliced automatically from `abde.jpg` (the contact sheet)
into `public/products/` by `scripts/generate.mjs`.

To **replace them with your own photos**, either:

- Upload new images per product in the **admin panel**, or
- Drop files into `public/` and point a product's `images` array at them.

Re-running `npm run seed` **overwrites** `data/products.json` — only run it if you
want to regenerate from the contact sheet again.

---

## Data & switching to a database

Products live in `data/products.json`, accessed through a small repository
interface in [`src/lib/store.ts`](src/lib/store.ts). This works out of the box
locally and on any host with a writable filesystem.

**To move to Supabase / MongoDB later**, implement the `ProductRepository`
interface (`list`, `get`, `create`, `update`, `remove`) against your database and
export it as `repository`. Nothing in the API routes or UI needs to change.
The `Product` model already matches the requested schema:

```ts
id, name, brand, category, price, priceUsed?, images[], description, sizes[], featured, createdAt
```

> Note: on serverless hosts (e.g. Vercel) the filesystem is read-only, so admin
> writes won't persist there — switch to Supabase/MongoDB for production hosting,
> or deploy to a Node host with a persistent disk.

---

## Project structure

```
src/
  app/
    page.tsx              # Home
    shop/page.tsx         # Shop + filters
    admin/page.tsx        # Admin panel
    api/
      products/           # GET/POST + [id] GET/PUT/DELETE
      auth/               # login / logout / status
      upload/             # multi-image upload
    loading.tsx, shop/loading.tsx   # skeleton loaders
  components/             # Hero, Navbar, ProductCard, ProductGrid, admin/…
  lib/
    store.ts              # data repository (swap to Supabase here)
    config.ts             # site config, categories, Instagram link
    instagram.ts          # Buy Now deep-link + message
    auth.ts, types.ts
scripts/generate.mjs      # contact-sheet slicer + seeder
data/products.json        # product data (git-tracked)
public/products/          # generated product images
```

---

## Future ready

The codebase is structured so you can add later without a rewrite:

- **Shopping cart / wishlist** — add client state or a `useCart` context around `ProductCard`.
- **Online payments & accounts** — plug in after the repository/DB migration.
- **Order tracking & coupons** — new API routes alongside `api/products`.
- **Languages (EN / FR / AR)** — strings are centralized; add `next-intl` and a locale switch.

---

© 2026 Zu Zu Xia
