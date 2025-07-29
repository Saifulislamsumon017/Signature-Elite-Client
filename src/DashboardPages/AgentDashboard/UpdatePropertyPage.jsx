import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import ImageUploader from '@/SheardComponents/ImageUploader';
import { useNavigate, useParams } from 'react-router';

const UpdatePropertyPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosSecure.get(`/property/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error('Failed to fetch property data:', error);
        Swal.fire('Error', 'Failed to fetch property data.', 'error');
      }
    };

    fetchProperty();
  }, [id, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.title || !form.location) {
      Swal.fire('Error', 'Title and Location are required.', 'error');
      return;
    }

    const updatedData = {
      ...form,
      minPrice: parseFloat(form.minPrice),
      maxPrice: parseFloat(form.maxPrice),
      bedrooms: parseInt(form.bedrooms),
      bathrooms: parseInt(form.bathrooms),
    };

    try {
      await axiosSecure.put(`/properties/${id}`, updatedData);
      Swal.fire('Updated!', 'Property updated successfully.', 'success');
      navigate('/dashboard/my-properties');
    } catch (error) {
      console.error(
        'Failed to update property:',
        error.response?.data || error.message
      );
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Failed to update property.',
        'error'
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUploader
          onUpload={url => setForm({ ...form, image: url })}
          type="property"
        />
        {form.image && (
          <img
            src={form.image}
            alt="Property Preview"
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
    </div>
  );
};

export default UpdatePropertyPage;
