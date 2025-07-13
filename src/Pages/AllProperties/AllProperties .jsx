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
    isError,
    refetch,
  } = useQuery({
    queryKey: ['all-properties', search, sort],
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
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Verified Properties</h1>

      {/* Search & Sort Controls */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-xs"
        />

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>

      {/* Loading / Error */}
      {isLoading && <p>Loading properties...</p>}
      {isError && <p>Failed to load properties. Try again.</p>}

      {/* Properties Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default AllProperties;
