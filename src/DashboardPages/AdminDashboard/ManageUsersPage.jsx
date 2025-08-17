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

  if (isLoading)
    return (
      <p className="text-center p-10 text-gray-600 dark:text-gray-300">
        Loading...
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Manage Users
      </h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No users found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded shadow border bg-white dark:bg-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-left text-gray-700 dark:text-gray-200">
                <th className="p-3 whitespace-nowrap">#</th>
                <th className="p-3 whitespace-nowrap">Photo</th>
                <th className="p-3 whitespace-nowrap">Name</th>
                <th className="p-3 whitespace-nowrap">Email</th>
                <th className="p-3 whitespace-nowrap">Role</th>
                <th className="p-3 whitespace-nowrap w-64">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3 whitespace-nowrap text-gray-800 dark:text-gray-200">
                    {idx + 1}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <img
                      src={user.photoURL}
                      alt={`${user.name}'s avatar`}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap text-gray-800 dark:text-gray-200">
                    {user.name}
                  </td>
                  <td className="p-3 whitespace-nowrap text-gray-800 dark:text-gray-200">
                    {user.email}
                  </td>
                  <td className="p-3 whitespace-nowrap capitalize text-gray-800 dark:text-gray-200">
                    {user.role}
                  </td>
                  <td className="p-3 whitespace-normal flex flex-wrap gap-2 items-center">
                    {user.role !== 'fraud' &&
                      ['user', 'agent', 'admin']
                        .filter(r => r !== user.role)
                        .map(r => (
                          <button
                            key={r}
                            onClick={() => handleRoleChange(user._id, r)}
                            className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-blue-100 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label={`Make user ${r}`}
                            type="button"
                          >
                            <AiOutlineUserSwitch />
                            Make {r}
                          </button>
                        ))}

                    {user.role === 'agent' && (
                      <button
                        onClick={() => handleMarkFraud(user._id, user.email)}
                        className="flex items-center gap-1 text-sm bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100 px-2 py-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        aria-label="Mark user as fraud"
                        type="button"
                      >
                        <FaExclamationTriangle />
                        Mark as Fraud
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-1 text-sm bg-red-100 text-red-600 dark:bg-red-600 dark:text-red-100 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label="Delete user"
                      type="button"
                    >
                      <FaTrash />
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
