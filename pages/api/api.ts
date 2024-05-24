// api.ts
import axios from "axios";
import Cookies from "js-cookie";

type UserModel = {
  id?: string;
  userName?: string;
  email?: string;
  role?: string;
  departmentIds?: number[];
};

type RegisterModel = {
  email: string;
  userName: string;
  password: string;
  role: string;
  departmentIds: number[];
};

const User_URL = "https://localhost:7099/api/user";
const Department_URL = "https://localhost:7099/api/department";
const token = Cookies.get("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getAllUsers = () => axios.get(`${User_URL}/get-all-users`);
export const getAllDepartments = () => axios.get(`${Department_URL}`);
export const getUserById = (id: string) =>
  axios.get(`${User_URL}/get-user-by-id/${id}`);
export const createUser = (user: RegisterModel) =>
  axios.post(`${User_URL}/create-user`, user);
export const updateUser = (id: string, user: UserModel) =>
  axios.put(`${User_URL}/update-user/${id}`, user);
export const deleteUser = (id: string) =>
  axios.delete(`${User_URL}/delete-user/${id}`);
