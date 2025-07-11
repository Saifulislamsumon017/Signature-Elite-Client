import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
  });

  // Request interceptor (attach JWT token)
  axiosSecure.interceptors.request.use(config => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor (handle 401, 403 errors globally)
  axiosSecure.interceptors.response.use(
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

  return axiosSecure;
};

export default useAxiosSecure;
