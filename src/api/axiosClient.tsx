import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust the base URL as needed
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies in requests
  timeout: 10000, // Set a timeout for requests (optional)
});

apiClient.interceptors.request.use((config) => {
  // config is the request configuration object
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an unauthorized access and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as having been retried
      try {
        // Attempt to refresh the token
        const res = await apiClient.post("/auth/refresh");

        const newToken = res.data.results.accessToken;

        localStorage.setItem("token", newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
