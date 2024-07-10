import CommonListing from "../../../components/CommonListing";
import { getAllAdminProducts } from "../../../services/product";

export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminProducts();

  return (
    <div className="mt-[80px]">
      <CommonListing data={allAdminProducts && allAdminProducts.data} />
    </div>
  );
}
