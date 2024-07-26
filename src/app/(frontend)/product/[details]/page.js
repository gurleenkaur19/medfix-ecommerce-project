import CommonDetails from "@/components/CommonDetails";
import { ProductById } from "../../../../services/product";

export default async function ProductDetails({ params }) {
  const productId = params.details;
  console.log("ProductDetails params:", productId);

  const productDetailsData = await ProductById(productId);

  return (
    <>
      {productDetailsData && productDetailsData.success ? (
        <CommonDetails item={productDetailsData.data} />
      ) : (
        <div className="mt-[80px] text-red-700">No product found</div>
      )}
    </>
  );
}
