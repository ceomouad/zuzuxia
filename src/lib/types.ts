export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  /** Optional "used / pre-owned" price shown alongside the new price. */
  priceUsed?: number;
  /** Display label for the new price, e.g. "MYR400+" or "MYR600-700+". */
  priceLabel?: string;
  /** Display label for the used ("Sec Hand") price. */
  priceUsedLabel?: string;
  images: string[];
  description: string;
  sizes: string[];
  featured: boolean;
  createdAt: string;
}

export type ProductInput = Omit<Product, "id" | "createdAt"> & {
  id?: string;
  createdAt?: string;
};
