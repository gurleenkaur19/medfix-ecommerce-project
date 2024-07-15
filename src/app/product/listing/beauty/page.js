import CommonListing from "@/components/CommonListing";
import { getProductByCategory } from "@/services/product";

export default async function beautyAllProducts() {
  const getAllProducts = await getProductByCategory("beauty");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
