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
    <div className="px-4 md:px-10 py-6 space-y-6">
      <h2 className="text-3xl font-bold">All Verified Properties</h2>

      {/* 🔍 Search & Sort Controls */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 md:items-center"
      >
        <input
          type="text"
          placeholder="Search by location"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-60"
        />
        <select
          value={sort}
          onChange={e => {
            setSort(e.target.value);
            refetch();
          }}
          className="border p-2 rounded w-full md:w-40"
        >
          <option value="">Sort By Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* 🏘️ Property Cards */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProperties;
