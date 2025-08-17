import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const CustomerStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user-stats');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading stats...</p>;

  const chartData = [
    { name: 'Wishlist', value: stats.wishlist || 0 },
    { name: 'Offers', value: stats.offers || 0 },
    { name: 'Bought', value: stats.bought || 0 },
    { name: 'Reviews', value: stats.reviews || 0 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Dashboard Statistics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Wishlist</h3>
          <p className="text-3xl font-bold">{stats.wishlist || 0}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Offers</h3>
          <p className="text-3xl font-bold">{stats.offers || 0}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Bought</h3>
          <p className="text-3xl font-bold">{stats.bought || 0}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Reviews</h3>
          <p className="text-3xl font-bold">{stats.reviews || 0}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">Your Activity Overview</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366F1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerStatistics;
