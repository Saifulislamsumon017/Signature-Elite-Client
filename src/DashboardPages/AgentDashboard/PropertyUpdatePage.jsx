import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import ImageUploader from '@/SheardComponents/ImageUploader';

const UpdatePropertyPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form state
  const [form, setForm] = useState({
    image: '',
    title: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    facilities: '',
    bedrooms: '',
    bathrooms: '',
  });

  // Load property
  const { data: property, isLoading } = useQuery({
    queryKey: ['single-property', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (property) {
      setForm({
        image: property.image || '',
        title: property.title || '',
        location: property.location || '',
        minPrice: property.minPrice || '',
        maxPrice: property.maxPrice || '',
        facilities: property.facilities?.join(', ') || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
      });
    }
  }, [property]);

  // Mutation for update
  const updateMutation = useMutation({
    mutationFn: async updatedData => {
      await axiosSecure.patch(`/property/${id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-properties', user.email]);
      Swal.fire('Updated!', 'Property updated successfully.', 'success');
      navigate('/dashboard/my-properties');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update property.', 'error');
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.location) {
      Swal.fire('Error', 'Title and Location are required.', 'error');
      return;
    }

    // Prepare facilities array
    const facilitiesArray = form.facilities
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);

    const updatedData = {
      ...form,
      facilities: facilitiesArray,
      minPrice: parseFloat(form.minPrice),
      maxPrice: parseFloat(form.maxPrice),
      bedrooms: parseInt(form.bedrooms),
      bathrooms: parseInt(form.bathrooms),
    };

    updateMutation.mutate(updatedData);
  };

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (!property)
    return <div className="text-center p-10">Property not found.</div>;

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUploader
          onUpload={url => setForm({ ...form, image: url })}
          type="property"
        />

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="w-full h-48 object-cover rounded"
          />
        )}

        <div>
          <label>Property Title</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Property Location</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              className="border p-2 w-full rounded"
              placeholder="Min Price"
              value={form.minPrice}
              onChange={e => setForm({ ...form, minPrice: e.target.value })}
              required
            />
            <input
              type="number"
              className="border p-2 w-full rounded"
              placeholder="Max Price"
              value={form.maxPrice}
              onChange={e => setForm({ ...form, maxPrice: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label>Facilities (comma-separated)</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.facilities}
            onChange={e => setForm({ ...form, facilities: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label>Bedrooms</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={form.bedrooms}
              onChange={e => setForm({ ...form, bedrooms: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label>Bathrooms</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={form.bathrooms}
              onChange={e => setForm({ ...form, bathrooms: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label>Agent Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded bg-gray-100"
            value={user.displayName}
            readOnly
          />
        </div>

        <div>
          <label>Agent Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded bg-gray-100"
            value={user.email}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700 w-full"
        >
          Update Property
        </button>
      </form>
    </section>
  );
};

export default UpdatePropertyPage;
