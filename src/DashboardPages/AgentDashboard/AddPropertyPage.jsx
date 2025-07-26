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
      Swal.fire('Success', 'Property added successfully!', 'success');
      navigate('/dashboard/my-properties');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to add property.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUploader onUpload={setImage} type="property" />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-full h-48 object-cover rounded"
          />
        )}

        <div>
          <label>Property Title</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Property Location</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={location}
            onChange={e => setLocation(e.target.value)}
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
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              required
            />
            <input
              type="number"
              className="border p-2 w-full rounded"
              placeholder="Max Price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label>Facilities (comma-separated)</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={facilities}
            onChange={e => setFacilities(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label>Bedrooms</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label>Bathrooms</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={bathrooms}
              onChange={e => setBathrooms(e.target.value)}
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
          disabled={loading}
          className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700 w-full"
        >
          {loading ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
