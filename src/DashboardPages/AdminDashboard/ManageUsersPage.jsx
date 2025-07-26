import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';

const ManageUsersPage = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/users');
      return res.data;
    },
  });

  const handleRoleChange = async (id, role) => {
    const confirm = await Swal.fire({
      title: `Make this user ${role}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/admin/users/${id}/role`, { role });
      refetch();
      Swal.fire('Updated!', `User role changed to ${role}`, 'success');
    }
  };

  const handleMarkFraud = async (id, email) => {
    const confirm = await Swal.fire({
      title: 'Mark as Fraud?',
      text: 'This agent will be marked as fraud and their properties hidden.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark as fraud!',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/admin/users/${id}/fraud`, { email });
      refetch();
      Swal.fire('Marked!', 'User marked as fraud.', 'success');
    }
  };

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/users/${id}`);
      refetch();
      Swal.fire('Deleted!', 'User deleted.', 'success');
    }
  };

  if (isLoading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">#</th>
                <th className="p-3">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    <img
                      src={user.photo}
                      alt="user"
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 flex flex-wrap gap-2 items-center">
                    {user.role !== 'fraud' &&
                      ['user', 'agent', 'admin']
                        .filter(r => r !== user.role)
                        .map(r => (
                          <button
                            key={r}
                            onClick={() => handleRoleChange(user._id, r)}
                            className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                          >
                            <AiOutlineUserSwitch className="inline mr-1" />
                            Make {r}
                          </button>
                        ))}

                    {user.role === 'agent' && (
                      <button
                        onClick={() => handleMarkFraud(user._id, user.email)}
                        className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200"
                      >
                        <FaExclamationTriangle className="inline mr-1" />
                        Mark as Fraud
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                    >
                      <FaTrash className="inline mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
