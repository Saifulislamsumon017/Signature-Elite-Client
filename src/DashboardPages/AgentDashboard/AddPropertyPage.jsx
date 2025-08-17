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
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Add New Property
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 transition-colors duration-200"
      >
        {/* Image Upload */}
        <ImageUploader onUpload={setImage} type="property" />
        {image && (
          <img
            src={image}
            alt="Property Preview"
            className="w-full h-52 object-cover rounded-md border border-gray-300 dark:border-gray-700"
          />
        )}

        {/* Property Title and Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              Property Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              Location
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Write a short property description..."
            required
          ></textarea>
        </div>

        {/* Price, Bedrooms, Bathrooms */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              Min Price ($)
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              Max Price ($)
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              Bedrooms
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              Bathrooms
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={bathrooms}
              onChange={e => setBathrooms(e.target.value)}
            />
          </div>
        </div>

        {/* Facilities */}
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            Facilities (comma-separated)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={facilities}
            onChange={e => setFacilities(e.target.value)}
          />
        </div>

        {/* Agent Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              Agent Name
            </label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              Agent Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-600 dark:bg-blue-400 text-white py-2 rounded-md font-semibold transition"
        >
          {loading ? 'Submitting...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
