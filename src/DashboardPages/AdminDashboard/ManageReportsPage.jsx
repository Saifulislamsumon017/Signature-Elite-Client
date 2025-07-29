import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageReportsPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all reported properties
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reports');
      return res.data;
    },
  });

  // Delete report (and optionally the property too)
  const deleteReportMutation = useMutation({
    mutationFn: async reportId => {
      return await axiosSecure.delete(`/reports/${reportId}`);
    },
    onSuccess: () => {
      toast.success('Report deleted');
      queryClient.invalidateQueries(['reports']);
    },
    onError: () => {
      toast.error('Failed to delete');
    },
  });

  if (isLoading) return <p className="p-6">Loading reports...</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reported Properties</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">#</th>
                <th className="p-3">Property ID</th>
                <th className="p-3">Reason</th>
                <th className="p-3">User</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr key={report._id} className="border-b">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{report.propertyId}</td>
                  <td className="p-3">{report.reason}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={report.userImage}
                      alt="user"
                      className="h-8 w-8 rounded-full"
                    />
                    <span>{report.userName}</span>
                  </td>
                  <td className="p-3">
                    {new Date(report.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteReportMutation.mutate(report._id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm"
                    >
                      Delete Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageReportsPage;
