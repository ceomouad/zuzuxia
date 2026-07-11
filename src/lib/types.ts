export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  /** Optional "used / pre-owned" price shown alongside the new price. */
  priceUsed?: number;
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
