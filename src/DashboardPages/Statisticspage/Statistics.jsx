import useUserRole from '@/hooks/useUserRole';
import LoadingSpinner from '@/SheardComponents/LoadingSpinner';
import AdminStatistics from '../AdminDashboard/AdminStatistics';
import AgentStatistics from '../AgentDashboard/AgentStatistics';
import CustomerStatistics from '../UserDashboard/CustomerStatistics';

const Statistics = () => {
  const [role, isRoleLoading] = useUserRole();

  if (isRoleLoading) return <LoadingSpinner />;

  // Role-based heading
  const headingMap = {
    admin: 'Admin Dashboard',
    agent: 'Agent Dashboard',
    user: 'User Dashboard',
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Dynamic Page Title */}
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          {headingMap[role] || 'Dashboard'}
        </h1>

        {/* Role-based Statistics */}
        <div>
          {role === 'admin' && <AdminStatistics />}
          {role === 'agent' && <AgentStatistics />}
          {role === 'user' && <CustomerStatistics />}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
