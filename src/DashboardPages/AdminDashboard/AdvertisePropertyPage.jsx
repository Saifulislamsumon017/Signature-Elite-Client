import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const AdvertisePropertyPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['advertise-list'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/advertise-list');
      return res.data;
    },
  });

  const { mutate: advertiseProperty, isLoading: isMutating } = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.patch(`/admin/advertise/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('✅ Property marked as advertised');
      queryClient.invalidateQueries(['advertise-list']);
    },
    onError: () => {
      toast.error('❌ Failed to advertise property');
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Advertise Properties
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No verified properties available for advertisement.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div
              key={property._id}
              className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 flex flex-col transition hover:shadow-lg"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover rounded"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold mt-4 text-gray-800 dark:text-gray-100">
                {property.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1 flex-grow">
                {property.description?.length > 60
                  ? property.description.slice(0, 60) + '...'
                  : property.description}
              </p>

              <p className="font-medium text-green-600 dark:text-green-400 mt-2">
                ${property.minPrice?.toLocaleString()} - $
                {property.maxPrice?.toLocaleString()}
              </p>

              <button
                onClick={() => advertiseProperty(property._id)}
                disabled={isMutating}
                className="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label={`Advertise property ${property.title}`}
              >
                {isMutating ? 'Advertising...' : 'Advertise'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertisePropertyPage;
