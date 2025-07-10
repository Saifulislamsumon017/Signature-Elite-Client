import PropertyCard from '@/Components/ui/PropertyCard/PropertyCard';
import useAxiosSecure from '@/hoocks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const {
    data: properties = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['properties', search, sort],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-properties', {
        params: { search, sort },
      });
      return res.data;
    },
  });

  const handleSearch = e => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Verified Properties</h2>

      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </form>

      {isLoading && <p className="text-center">Loading...</p>}
      {isError && (
        <p className="text-center text-red-500">Error loading properties</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
