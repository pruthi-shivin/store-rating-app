import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboard = () => {
  return axios.get(`${API_URL}/dashboard`, getAuthHeader());
};

export const getUsers = (search = "", role = "") => {
  return axios.get(
    `${API_URL}/users?search=${search}&role=${role}`,
    getAuthHeader()
  );
};

export const createUser = (data) => {
  return axios.post(`${API_URL}/create-user`, data, getAuthHeader());
};

export const createStore = (data) => {
  return axios.post(`${API_URL}/create-store`, data, getAuthHeader());
};

export const getStores = () => {
  return axios.get(`${API_URL}/stores`, getAuthHeader());
};