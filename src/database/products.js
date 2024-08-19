import Product from "@/models/product";
import connectToDB from ".";

export const getAllProducts = async () => {
  try {
    await connectToDB();
    const allProducts = await Product.find({});
    return allProducts;
  } catch (e) {
    console.log(e);
  }
};
