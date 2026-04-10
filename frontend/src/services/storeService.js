import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getStores = async (search = "") => {
  const token = localStorage.getItem("token");

  return axios.get(
    `http://localhost:5000/api/stores?search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};