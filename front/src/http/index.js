import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const api = axios.create({
  baseURL: `${REACT_APP_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
    Accept: "*/*",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/refresh-token`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
            },
          },
          {
            refresh_token: `${localStorage.getItem("refresh_token")}`,
          }
        );

        sessionStorage.setItem("access_token", data.body.access_token);
        sessionStorage.setItem("refresh_token", data.body.refresh_token);
        originalRequest.headers.Authorization = `Bearer ${data.body.access_token}`;
        return api.request(originalRequest);
      } catch (err) {
        console.error(err.message);
      }
    }
    throw error;
  }
);

// APIs
export const signIn = (data) => api.post("/auth/login", data);
export const createAccount = (data) => api.post("/auth/register", data);

export const getMe = () => api.get("/users/me");
export const logout = (data) => api.get("/auth/logout");
