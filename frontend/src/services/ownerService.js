import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getOwnerDashboard = () => {
  return axios.get(`${API_URL}/api/owner/dashboard`, getAuthHeader());
};