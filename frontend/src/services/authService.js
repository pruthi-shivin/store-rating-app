import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://store-rating-backend-tvce.onrender.com";

export const signupUser = async (data) => {
  return axios.post(`${API_URL}/api/auth/signup`, data);
};

export const loginUser = async (data) => {
  return axios.post(`${API_URL}/api/auth/login`, data);
};

export const changePassword = (data) => {
  return axios.post(
    `${API_URL}/api/auth/change-password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};