import Cookies from "js-cookie";

export const addToCart = async (formData) => {
  try {
    const res = await fetch("/api/cart/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error adding to cart:", e);
    return { success: false, error: e.message };
  }
};

export const getAllCartItems = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:4000/api/cart/all-cart-items?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to fetch cart items:", e);
    return { success: false, data: [] };
  }
};

export const deleteFromCart = async (id) => {
  try {
    const res = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
