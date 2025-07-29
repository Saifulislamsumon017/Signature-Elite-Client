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

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['my-properties', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/agent/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading your properties...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Added Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div
              key={property._id}
              className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600">📍 {property.location}</p>
                <p className="text-sm text-gray-600">
                  💰 ${property.minPrice} - ${property.maxPrice}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={property.agentImage}
                    alt={property.agentName}
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="text-sm">{property.agentName}</span>
                </div>

                <div>
                  <span
                    className={`inline-block text-xs font-medium px-2 py-1 rounded ${
                      property.verificationStatus === 'verified'
                        ? 'bg-green-100 text-green-700'
                        : property.verificationStatus === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {property.verificationStatus}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  {property.verificationStatus !== 'rejected' && (
                    <button
                      onClick={() =>
                        navigate(`/dashboard/update-property/${property._id}`)
                      }
                      className="bg-indigo-600 text-white px-4 py-1.5 text-sm rounded hover:bg-indigo-700"
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="bg-red-600 text-white px-4 py-1.5 text-sm rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedPropertiesPage;
