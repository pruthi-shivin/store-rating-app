import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://store-rating-backend-tvce.onrender.com";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getOwnerDashboard = () => {
  return axios.get(`${API_URL}/api/owner/dashboard`, getAuthHeader());
};