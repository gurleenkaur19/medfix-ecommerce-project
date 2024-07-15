import CommonListing from "@/components/CommonListing";
import { getProductByCategory } from "@/services/product";

export default async function babyAllProducts() {
  const getAllProducts = await getProductByCategory("baby-care");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
