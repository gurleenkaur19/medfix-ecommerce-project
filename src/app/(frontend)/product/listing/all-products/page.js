"use client";

import { useState, useEffect } from "react";
import CommonListing from "../../../../../components/CommonListing";
import { SECURE_GET } from "@/utils/request";

export default function AdminAllProducts() {
  const [allAdminProducts, setAllAdminProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await SECURE_GET("/admin/all-products");
        setAllAdminProducts(products);
        console.log(products);
      } catch (error) {
        setError(error);
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-[80px]">
      <CommonListing data={allAdminProducts && allAdminProducts.data} />
    </div>
  );
}
