import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdLocalOffer } from 'react-icons/md';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// custom triangle shape
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  },${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  },${y + height}
    Z`;
};

const TriangleBar = props => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const AgentStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ['agentStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agent-stats');
      return res.data;
    },
  });

  const chartData = [
    {
      name: 'Total Properties',
      value: stats.totalProperties || 0,
      color: '#3B82F6',
    },
    {
      name: 'Sold Properties',
      value: stats.soldProperties || 0,
      color: '#22C55E',
    },
    {
      name: 'Offers Received',
      value: stats.offersReceived || 0,
      color: '#FACC15',
    },
  ];

  const cards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties || 0,
      bg: 'from-blue-500 to-blue-400',
      icon: <BsFillHouseDoorFill className="w-8 h-8 text-white" />,
    },
    {
      title: 'Sold Properties',
      value: stats.soldProperties || 0,
      bg: 'from-green-500 to-green-400',
      icon: <GiReceiveMoney className="w-8 h-8 text-white" />,
    },
    {
      title: 'Offers Received',
      value: stats.offersReceived || 0,
      bg: 'from-yellow-500 to-yellow-400',
      icon: <MdLocalOffer className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`relative p-6 rounded-2xl shadow-md text-white bg-gradient-to-r ${card.bg} 
            transform hover:scale-[1.05] transition-all duration-300 flex flex-col justify-between`}
          >
            <div className="absolute -top-5 left-5 bg-white/20 p-3 rounded-xl shadow-lg">
              {card.icon}
            </div>
            <div className="text-right mt-6">
              <h3 className="text-sm font-medium opacity-90">{card.title}</h3>
              <p className="text-4xl font-extrabold mt-2">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stylish Triangle Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          📈 Performance Overview
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fill: '#374151', fontWeight: 500 }} />
            <YAxis tick={{ fill: '#374151' }} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
              }}
            />
            <Bar
              dataKey="value"
              shape={<TriangleBar />}
              label={{ position: 'top', fontWeight: 'bold' }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgentStatistics;
