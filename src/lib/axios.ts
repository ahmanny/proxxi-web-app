import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "react-hot-toast";

// ===========================================
// Type Definitions
// ===========================================

export interface ApiError {
  message?: string;
  code?: string | number;
  status?: number;
}

export interface TokenResponse {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  code?: string | number;
  status?: number;
}

// ===========================================
// Configuration
// ===========================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";

// ===========================================
// Create Axios Instance
// ===========================================

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  withCredentials: true, // Allow credentials (cookies)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// ===========================================
// Request Interceptor
// ===========================================

API.interceptors.request.use(
  (config) => {
    // Get token from cookies
    const cookies = parseCookies();
    const accessToken = cookies["access-token"];
    const userRole = cookies["user-role"];

    // Attach authorization header if token exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add role header for admin-specific endpoints
    if (userRole) {
      config.headers["X-User-Role"] = userRole;
    }

 

    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  }
);

// ===========================================
// Response Interceptor
// ===========================================

API.interceptors.response.use(
  (response: AxiosResponse) => {
    // Development logging
    if (IS_DEVELOPMENT) {
      // Dev logging: API Response
    }

    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle non-Axios errors
    if (!error.response) {
      const message = error.message || "Network error. Please check your connection.";
      console.error("[Network Error]", message);
      return Promise.reject({ message, status: 0 });
    }

    const { status, data } = error.response;

    // Development logging
    if (IS_DEVELOPMENT) {
      console.error(`[API Error] ${status} ${originalRequest.url}`, data);
    }

    // Handle 401 - Unauthorized (Token expired/invalid)
    if (status === 401) {
      // Check if it's a token expiration error (code 106)
      const isTokenExpired = data?.code === 106 || data?.message?.includes("token") || data?.message === "jwt expired";

      if (isTokenExpired && !originalRequest._retry) {
        originalRequest._retry = true;

        if (typeof window !== "undefined" && window.location.pathname === "/admin/login") {
          destroyCookie(null, "access-token", { path: "/" });
          destroyCookie(null, "refresh-token", { path: "/" });
          destroyCookie(null, "user-role", { path: "/" });
          return Promise.reject(error);
        }

        if (!isRefreshing) {
          isRefreshing = true;

          refreshAccessToken()
            .then(() => {
              isRefreshing = false;
              const cookies = parseCookies();
              const newToken = cookies["access-token"];
              onRefreshed(newToken);
            })
            .catch((err) => {
              isRefreshing = false;
              handleSessionExpired();
              return Promise.reject(err);
            });
        }

        const retryOriginalRequest = new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(API(originalRequest));
          });
        });

        return retryOriginalRequest;
      }

      // Non-token related 401 (e.g., invalid credentials) should not log out if on login screen
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        handleSessionExpired();
      }
    }

    // Handle 403 - Forbidden
    if (status === 403) {
      toast.error(data?.message || "You don't have permission to perform this action.");
    }

    // Handle 404 - Not Found
    if (status === 404) {
      console.error("[Not Found]", originalRequest.url);
    }

    // Handle 422 - Validation Error
    if (status === 422) {
      const message = data?.message || "Validation error occurred.";
      console.error("[Validation Error]", message);
    }

    // Handle 500 - Server Error
    if (status === 500) {
      console.error("[Server Error]", data);
      toast.error("Server error. Please try again later.");
    }

    // Return standardized error
    return Promise.reject({
      message: data?.message || `Request failed with status ${status}`,
      code: data?.code,
      status,
    });
  }
);

// ===========================================
// Helper Functions
// ===========================================

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(): Promise<void> {
  const cookies = parseCookies();
  const refreshToken = cookies["refresh-token"];
  const userRole = cookies["user-role"];

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const refreshEndpoint = userRole === "admin" ? "/auth/admin/refresh" : "/authentication/refresh-token";

  try {
    const response = await axios.post<TokenResponse>(
      `${API_BASE_URL}${refreshEndpoint}`,
      { refresh_token: refreshToken },
      { withCredentials: true }
    );

    const { access_token, refresh_token: newRefreshToken } = (response.data as any).data?.tokens || (response.data as any).tokens;

    // Update cookies with new tokens
    setCookie(null, "access-token", access_token, {
      path: "/",
      maxAge: 60 * 60 * 4, // 4 hours
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    setCookie(null, "refresh-token", newRefreshToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    if (IS_DEVELOPMENT) {
      console.log("[Token Refresh] Access token refreshed successfully");
    }
  } catch (error) {
    console.error("[Token Refresh] Failed to refresh token", error);
    throw error;
  }
}

/**
 * Handle session expiration - clear cookies and redirect
 */
function handleSessionExpired(): void {
  // Clear authentication cookies
  destroyCookie(null, "access-token");
  destroyCookie(null, "refresh-token");
  destroyCookie(null, "user-role");

  // Show notification
  toast.error("Your session has expired. Please log in again.");

  // Optional: Redirect to login page
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    if (!currentPath.includes("/admin/login")) {
      window.location.href = `/admin/login?callbackUrl=${encodeURIComponent(currentPath)}`;
    }
  }
}

// ===========================================
// API Utility Methods
// ===========================================

/**
 * Check if API is reachable
 */
export const healthCheck = async (): Promise<boolean> => {
  try {
    await API.get("/health", { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
};

/**
 * Get base URL
 */
export const getBaseURL = (): string => API_BASE_URL;

// ===========================================
// Export
// ===========================================

export default API;

// Re-export types for external use
export type { AxiosError, AxiosRequestConfig, AxiosResponse };