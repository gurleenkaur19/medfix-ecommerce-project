import CommonListing from "../../../../components/CommonListing";
import { SECURE_GET } from "@/utils/request";

export default async function AdminAllProducts() {
  const allAdminProducts = await SECURE_GET("/admin/all-products");
  // console.log(allAdminProducts);
  return (
    <div className="mt-[80px]">
      <CommonListing data={allAdminProducts && allAdminProducts.data} />
    </div>
  );
}
