import axios from "axios";

const API_URL = "http://localhost:5000/api/owner";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getOwnerDashboard = () => {
  return axios.get(`${API_URL}/dashboard`, getAuthHeader());
};