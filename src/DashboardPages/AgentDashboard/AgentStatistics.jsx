import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#3B82F6', '#22C55E', '#FACC15'];

const AgentStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['agentStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agent-stats');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading stats...</p>;

  const chartData = [
    { name: 'Total Properties', value: stats.totalProperties || 0 },
    { name: 'Sold Properties', value: stats.soldProperties || 0 },
    { name: 'Offers Received', value: stats.offersReceived || 0 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Agent Dashboard Statistics</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Properties</h3>
          <p className="text-3xl font-bold">{stats.totalProperties || 0}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Sold Properties</h3>
          <p className="text-3xl font-bold">{stats.soldProperties || 0}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Offers Received</h3>
          <p className="text-3xl font-bold">{stats.offersReceived || 0}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">Overview Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgentStatistics;
