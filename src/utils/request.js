import Cookies from "js-cookie";
export const GET = async (url) => {
  try {
    const res = await fetch(`/api${url}`, {
      method: "GET",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const SECURE_GET = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:4000/api${url}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
