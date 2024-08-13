import Cookies from "js-cookie";

export const createNewOrder = async (formData) => {
  try {
    const res = await fetch("/api/order/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrdersForUser = async (id) => {
  try {
    const res = await fetch(`/api/order/get-all-orders?id=${id}`, {
      method: "GET",
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

export const getOrderDetails = async (id) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await fetch(`/api/order/order-details?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error fetching order details:", e);
    return { success: false, error: e.message };
  }
};

export const getAllOrdersForAllUsers = async () => {
  try {
    const res = await fetch(`/api/admin/orders/get-all-orders`, {
      method: "GET",
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

export const updateStatusOfOrder = async (formData) => {
  try {
    const res = await fetch(`/api/admin/orders/update-order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
