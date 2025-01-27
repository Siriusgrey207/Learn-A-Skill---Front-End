import axios from "axios";
import { developmentMode } from "../constants/devTools";

// Set the base URL to the backend server, not the frontend one
const api = axios.create({
  baseURL: developmentMode ? "http://localhost:5000" : "PRODUCTION_URL", // Use backend URL for both dev and production
  withCredentials: true,
});

// Interceptor to refresh tokens
api.interceptors.response.use(
  // Successful responses pass through
  (response) => response,
  // In the case the access token has expired, we should get a 401 (unauthorized)
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const url = developmentMode
          ? "http://localhost:5000/api/v1/auth/refresh-token" // Refresh token endpoint for dev
          : "PRODUCTION_URL/api/v1/auth/refresh-token"; // Production URL for refresh token
        // Refresh the token
        const refreshResponse = await axios.post(
          url,
          {},
          { withCredentials: true }
        );
        console.log("Response Cookies:", refreshResponse.headers["set-cookie"]);
        // We get the access token back.
        const { accessToken } = refreshResponse.data;
        // Update the headers and retry the original request.
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
        // If the refresh token has expired, we redirect the user to the login page.
        console.error("Token refresh failed", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
