import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 md:pt-32">
        <CartView />
      </div>
      <Footer />
    </main>
  );
}
