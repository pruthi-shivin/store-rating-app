import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const submitRating = async (data) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API_URL}/ratings`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};