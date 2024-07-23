import CommonListing from "@/components/CommonListing";
import { getProductByCategory } from "@/services/product";

export default async function testkitAllProducts() {
  const getAllProducts = await getProductByCategory("test-kit");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
