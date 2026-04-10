import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signupUser = async (data) => {
  return axios.post(`${API_URL}/signup`, data);
};

export const loginUser = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const changePassword = (data) => {
  return axios.post(
    "http://localhost:5000/api/auth/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};