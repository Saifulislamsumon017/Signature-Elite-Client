import axios from 'axios';
import toast from 'react-hot-toast';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:3000', // 🔁 Update this to match your backend
    });

    // ✅ Request Interceptor
    instance.interceptors.request.use(config => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // ❌ Response Interceptor
    instance.interceptors.response.use(
      res => res,
      err => {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          toast.error('Unauthorized. Please login again.');
          navigate('/login');
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
