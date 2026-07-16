import { MachHome } from "@/components/MachHome";
import { repository } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await repository.list();
  return <MachHome products={products} />;
}
