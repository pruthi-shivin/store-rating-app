import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://store-rating-backend-tvce.onrender.com";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const submitRating = (data) => {
  return axios.post(`${API_URL}/api/ratings`, data, getAuthHeader());
};

export const updateRating = (data) => {
  return axios.put(`${API_URL}/api/ratings`, data, getAuthHeader());
};