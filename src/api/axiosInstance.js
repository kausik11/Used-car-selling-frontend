import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Centralized request pipeline: every outbound call shares auth + logging behavior.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);

    return config;
  },
  (error) => Promise.reject(error),
);

// Responses are normalized once so context methods can consume a single shape.
axiosInstance.interceptors.response.use(
  (response) => ({
    success: true,
    status: response.status,
    data: response.data?.data ?? response.data,
    message: response.data?.message ?? 'Request successful',
    meta: response.data?.meta ?? null,
  }),
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem('token');
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    const normalizedError = {
      success: false,
      status,
      message: error?.response?.data?.message || error?.message || 'Something went wrong',
      details: error?.response?.data ?? null,
    };

    console.error('[API Error]', normalizedError);

    return Promise.reject(normalizedError);
  },
);

export default axiosInstance;
