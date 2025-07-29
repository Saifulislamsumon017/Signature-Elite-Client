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

  const { mutate: advertiseProperty } = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.patch(`/admin/advertise/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Property marked as advertised');
      queryClient.invalidateQueries(['advertise-list']);
    },
  });

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Advertise Properties</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No verified properties available for advertisement.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div
              key={property._id}
              className="border rounded-lg shadow p-4 bg-white"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{property.title}</h3>
              <p className="text-gray-600">
                {property.description?.slice(0, 60)}...
              </p>
              <p className="font-medium text-green-600">${property.price}</p>
              <button
                onClick={() => advertiseProperty(property._id)}
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Advertise
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdvertisePropertyPage;
