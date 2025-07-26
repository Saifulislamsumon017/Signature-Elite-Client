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

  if (isLoading) return <div className="text-center p-6">Loading...</div>;

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div key={property._id} className="border p-4 rounded shadow">
            <img
              src={property.image}
              alt={property.title}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{property.title}</h3>
            <p className="text-sm text-gray-600">{property.location}</p>
            <p className="text-sm">
              Agent: <span className="font-medium">{property.agentName}</span>
            </p>
            <p className="text-sm">
              Price: ${property.minPrice} - ${property.maxPrice}
            </p>

            <p className="text-sm mt-2">
              Status:{' '}
              <span
                className={`px-2 py-1 rounded text-xs ${
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
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleStatusUpdate(property._id, 'verified')}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleStatusUpdate(property._id, 'rejected')}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManagePropertiesPage;
