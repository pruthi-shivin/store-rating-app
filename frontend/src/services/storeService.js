import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://store-rating-backend-tvce.onrender.com";

export const getStores = async (search = "") => {
  const token = localStorage.getItem("token");

  return axios.get(
    `${API_URL}/api/stores?search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};