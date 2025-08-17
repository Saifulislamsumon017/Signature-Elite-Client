import useUserRole from '@/hooks/useUserRole';
import LoadingSpinner from '@/SheardComponents/LoadingSpinner';
import AdminStatistics from '../AdminDashboard/AdminStatistics';
import AgentStatistics from '../AgentDashboard/AgentStatistics';
import CustomerStatistics from '../UserDashboard/CustomerStatistics';

const Statistics = () => {
  const [role, isRoleLoading] = useUserRole();
  if (isRoleLoading) return <LoadingSpinner />;
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {role === 'admin' && <AdminStatistics />}
      {role === 'agent' && <AgentStatistics />}
      {role === 'user' && <CustomerStatistics />}
    </div>
  );
};

export default Statistics;
