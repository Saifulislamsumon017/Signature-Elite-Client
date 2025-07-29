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
    description: '',
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

    if (!form.title || !form.location || !form.description) {
      Swal.fire(
        'Error',
        'Title, Description, and Location are required.',
        'error'
      );
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
      console.error('Failed to update property:', error);
      Swal.fire('Error', 'Failed to update property.', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Update Property
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* Image Upload */}
        <ImageUploader
          onUpload={url => setForm({ ...form, image: url })}
          type="property"
        />
        {form.image && (
          <img
            src={form.image}
            alt="Property Preview"
            className="w-full h-52 object-cover rounded-md border"
          />
        )}

        {/* Title & Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Property Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>
        </div>

        {/* ✅ Description Field */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Write a short property description..."
            required
          ></textarea>
        </div>

        {/* Price, Bedrooms, Bathrooms */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Min Price ($)</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.minPrice}
              onChange={e => setForm({ ...form, minPrice: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Max Price ($)</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.maxPrice}
              onChange={e => setForm({ ...form, maxPrice: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Bedrooms</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.bedrooms}
              onChange={e => setForm({ ...form, bedrooms: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Bathrooms</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.bathrooms}
              onChange={e => setForm({ ...form, bathrooms: e.target.value })}
            />
          </div>
        </div>

        {/* Facilities */}
        <div>
          <label className="block mb-1 font-medium">
            Facilities (comma-separated)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.facilities}
            onChange={e => setForm({ ...form, facilities: e.target.value })}
          />
        </div>

        {/* Agent Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Agent Name</label>
            <input
              type="text"
              value={user.displayName}
              className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Agent Email</label>
            <input
              type="email"
              value={user.email}
              className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdatePropertyPage;
