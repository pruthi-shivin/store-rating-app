import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;;

export const submitRating = async (data) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API_URL}/api/ratings`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};