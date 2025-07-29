import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import PropertyCard from '@/Components/ui/PropertyCard/PropertyCard';

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['properties', search, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-properties?search=${search}&sort=${sort}`
      );
      return res.data;
    },
  });

  const handleSearch = e => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8 py-10 space-y-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
        All Verified Properties
      </h2>

      {/* 🔍 Search & Sort */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row md:justify-center gap-4"
      >
        <input
          type="text"
          placeholder="Search by location"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-64 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sort}
          onChange={e => {
            setSort(e.target.value);
            refetch();
          }}
          className="w-full md:w-48 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition duration-300"
        >
          Search
        </button>
      </form>

      {/* 🏘️ Property Grid */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;
