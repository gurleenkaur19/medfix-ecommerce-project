import CommonListing from "@/components/CommonListing";
import { getProductByCategory } from "@/services/product";

export default async function medicineAllProducts() {
  const getAllProducts = await getProductByCategory("medicine");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
