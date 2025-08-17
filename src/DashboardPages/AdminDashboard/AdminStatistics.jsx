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

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading stats...</p>;

  const chartData = [
    { name: 'Users', value: stats.totalUsers || 0 },
    { name: 'Agents', value: stats.totalAgents || 0 },
    { name: 'Properties', value: stats.totalProperties || 0 },
    { name: 'Reviews', value: stats.totalReviews || 0 },
    { name: 'Sold', value: stats.soldProperties || 0 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard Statistics</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers || 0}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Agents</h3>
          <p className="text-3xl font-bold">{stats.totalAgents || 0}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Properties</h3>
          <p className="text-3xl font-bold">{stats.totalProperties || 0}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Reviews</h3>
          <p className="text-3xl font-bold">{stats.totalReviews || 0}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Sold Properties</h3>
          <p className="text-3xl font-bold">{stats.soldProperties || 0}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">Platform Statistics</h3>
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
            <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatistics;
