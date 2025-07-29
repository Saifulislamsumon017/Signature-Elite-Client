import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '@/hooks/useAuth';

const ManagePropertiesPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['admin-properties'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/properties');
      return res.data;
    },
  });

  // Mutation to update verification status
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/admin/properties/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-properties']);
      Swal.fire('Success', 'Status updated!', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update status', 'error');
    },
  });

  const handleStatusUpdate = (id, status) => {
    updateStatus.mutate({ id, status });
  };

  if (isLoading)
    return <div className="text-center p-6 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Manage Properties
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div
            key={property._id}
            className="border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition cursor-default"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {property.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{property.location}</p>
              <p className="text-gray-700 text-sm mt-2">
                Agent: <span className="font-medium">{property.agentName}</span>
              </p>
              <p className="text-gray-700 text-sm">
                Price: ${property.minPrice} - ${property.maxPrice}
              </p>

              <p className="mt-3">
                Status:{' '}
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    property.verificationStatus === 'verified'
                      ? 'bg-green-100 text-green-700'
                      : property.verificationStatus === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {property.verificationStatus}
                </span>
              </p>

              {property.verificationStatus === 'pending' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleStatusUpdate(property._id, 'verified')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded py-2 font-semibold transition"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(property._id, 'rejected')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded py-2 font-semibold transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePropertiesPage;
