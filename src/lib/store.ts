// Server-only product repository.
//
// The default implementation persists to `data/products.json` on disk, which
// works out of the box for local development and any Node host with a writable
// filesystem. The `ProductRepository` interface is intentionally small so it
// can be reimplemented against Supabase or MongoDB later without touching the
// API routes or UI — see README ("Switching to a database").

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Product, ProductInput } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

export interface ProductRepository {
  list(): Promise<Product[]>;
  get(id: string): Promise<Product | null>;
  create(input: ProductInput): Promise<Product>;
  update(id: string, patch: Partial<ProductInput>): Promise<Product | null>;
  remove(id: string): Promise<boolean>;
}

async function readAll(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

/** Thrown when the data store can't be written (e.g. read-only serverless FS). */
export class StoreWriteError extends Error {
  constructor(cause?: unknown) {
    super(
      "The product store is read-only in this environment. Admin changes " +
        "require a writable filesystem (a Node host with a persistent disk) or " +
        "a database like Supabase. See README → “Switching to a database”."
    );
    this.name = "StoreWriteError";
    (this as { cause?: unknown }).cause = cause;
  }
}

async function writeAll(products: Product[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf8");
  } catch (err) {
    throw new StoreWriteError(err);
  }
}

const fileRepository: ProductRepository = {
  async list() {
    const products = await readAll();
    return products.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  },

  async get(id) {
    const products = await readAll();
    return products.find((p) => p.id === id) ?? null;
  },

  async create(input) {
    const products = await readAll();
    const product: Product = {
      id: input.id ?? `sku-${randomUUID().slice(0, 8)}`,
      name: input.name,
      brand: input.brand,
      category: input.category || input.brand,
      price: Number(input.price) || 0,
      priceUsed: input.priceUsed != null ? Number(input.priceUsed) : undefined,
      images: input.images?.length ? input.images : [],
      description: input.description ?? "",
      sizes: input.sizes ?? [],
      featured: Boolean(input.featured),
      createdAt: input.createdAt ?? new Date().toISOString(),
    };
    products.push(product);
    await writeAll(products);
    return product;
  },

  async update(id, patch) {
    const products = await readAll();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const current = products[idx];
    const next: Product = {
      ...current,
      ...patch,
      price: patch.price != null ? Number(patch.price) : current.price,
      priceUsed:
        patch.priceUsed != null ? Number(patch.priceUsed) : current.priceUsed,
      featured:
        patch.featured != null ? Boolean(patch.featured) : current.featured,
      id: current.id,
      createdAt: current.createdAt,
    };
    products[idx] = next;
    await writeAll(products);
    return next;
  },

  async remove(id) {
    const products = await readAll();
    const next = products.filter((p) => p.id !== id);
    if (next.length === products.length) return false;
    await writeAll(next);
    return true;
  },
};

export const repository: ProductRepository = fileRepository;
