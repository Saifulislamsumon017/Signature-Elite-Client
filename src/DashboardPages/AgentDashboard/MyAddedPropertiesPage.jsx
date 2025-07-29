import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const MyAddedPropertiesPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch properties added by agent
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['my-properties', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/agent/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async id => {
      await axiosSecure.delete(`/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-properties', user?.email]);
      Swal.fire('Deleted!', 'Property has been deleted.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to delete property.', 'error');
    },
  });

  // Handle delete with confirmation
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This property will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return <div className="text-center py-10">Loading properties...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Added Properties
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div
            key={property._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-3">{property.title}</h3>
            <p className="text-gray-600 text-sm">
              Location: {property.location}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <img
                src={property.agentImage}
                alt={property.agentName}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{property.agentName}</span>
            </div>

            <p className="text-sm mt-2">
              Price Range: ${property.minPrice} - ${property.maxPrice}
            </p>

            <p className="mt-2 text-sm">
              Status:{' '}
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  property.verificationStatus === 'verified'
                    ? 'bg-green-100 text-green-700'
                    : property.verificationStatus === 'rejected'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {property.verificationStatus || 'pending'}
              </span>
            </p>

            <div className="flex gap-2 mt-4">
              {property.verificationStatus !== 'rejected' && (
                <button
                  onClick={() =>
                    navigate(`/dashboard/update-property/${property._id}`)
                  }
                  className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(property._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedPropertiesPage;
