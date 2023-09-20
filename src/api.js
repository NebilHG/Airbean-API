import axios from "axios";

const API = axios.create({ baseURL: "https://airbean.awesomo.dev/api" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
    };
    return req;
});


// User actions
export const signup = (formData) => API.post("/user/signup", formData);
export const login = (formData) => API.post("/user/login", formData);
export const userStatus = () => API.get("/user/status");
export const getUserHistory = () => API.get("/user/history");

// Order/Products actions
export const getProducts = () => API.get("/beans");
export const placeOrder = (order) => API.post("/beans/order", order);
export const updateOrder = (order) => API.get(`/beans/order/status/${order}`);