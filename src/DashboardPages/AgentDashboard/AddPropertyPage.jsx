import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import ImageUploader from '@/SheardComponents/ImageUploader';
import { useNavigate } from 'react-router';

const AddPropertyPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [facilities, setFacilities] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const facilitiesArray = facilities
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);

    const newProperty = {
      image,
      title,
      description,
      location,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      facilities: facilitiesArray,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      agentName: user.displayName,
      agentEmail: user.email,
      agentImage: user.photoURL,
      verificationStatus: 'pending',
      advertised: false,
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      await axiosSecure.post('/properties', newProperty);
      Swal.fire('✅ Success', 'Property added successfully!', 'success');
      navigate('/dashboard/my-properties');
    } catch (error) {
      console.error(error);
      Swal.fire('❌ Error', 'Failed to add property.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Add New Property
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* Image Upload */}
        <ImageUploader onUpload={setImage} type="property" />
        {image && (
          <img
            src={image}
            alt="Property Preview"
            className="w-full h-52 object-cover rounded-md border"
          />
        )}

        {/* Property Title and Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Property Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={e => setLocation(e.target.value)}
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
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Write a short property description..."
            required
          ></textarea>
        </div>

        {/* Price, Bedrooms, Bathrooms */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Min Price ($)</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">Max Price ($)</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">Bedrooms</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">Bathrooms</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bathrooms}
              onChange={e => setBathrooms(e.target.value)}
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
            value={facilities}
            onChange={e => setFacilities(e.target.value)}
          />
        </div>

        {/* Agent Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Agent Name</label>
            <input
              type="text"
              value={user.displayName}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Agent Email</label>
            <input
              type="email"
              value={user.email}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold transition"
        >
          {loading ? 'Submitting...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
