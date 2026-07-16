import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckoutView } from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 md:pt-32">
        <CheckoutView />
      </div>
      <Footer />
    </main>
  );
}
