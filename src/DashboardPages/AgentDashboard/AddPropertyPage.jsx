import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import ImageUploader from '@/SheardComponents/ImageUploader';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const FACILITIES_OPTIONS = [
  'Garage',
  'Garden',
  'Swimming Pool',
  'Security System',
  'Playground',
  'Gym',
];

const AddPropertyPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFacilityChange = facility => {
    if (facilities.includes(facility)) {
      setFacilities(facilities.filter(f => f !== facility));
    } else {
      setFacilities([...facilities, facility]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      !title ||
      !location ||
      !image ||
      !minPrice ||
      !maxPrice ||
      !bedrooms ||
      !bathrooms
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    const newProperty = {
      title,
      location,
      image,
      agentName: user.displayName,
      agentEmail: user.email,
      agentImage: user.photoURL || '',
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      facilities,
      verificationStatus: 'pending',
    };

    try {
      setLoading(true);
      await axiosSecure.post('/properties', newProperty);
      toast.success('Property added successfully!');
      navigate('/dashboard/my-properties');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Property Title</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Property Location</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label>Property Image</label>
          <ImageUploader onUpload={setImage} type="property" />
          {image && (
            <p className="text-green-600 text-sm mt-1">Image uploaded!</p>
          )}
        </div>

        <div>
          <label>Agent Name</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={user.displayName}
            readOnly
          />
        </div>

        <div>
          <label>Agent Email</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={user.email}
            readOnly
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label>Minimum Price</label>
            <input
              type="number"
              className="border rounded p-2 w-full"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label>Maximum Price</label>
            <input
              type="number"
              className="border rounded p-2 w-full"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label>Bedrooms</label>
            <input
              type="number"
              className="border rounded p-2 w-full"
              value={bedrooms}
              onChange={e => setBedrooms(e.target.value)}
              min="1"
            />
          </div>
          <div className="flex-1">
            <label>Bathrooms</label>
            <input
              type="number"
              className="border rounded p-2 w-full"
              value={bathrooms}
              onChange={e => setBathrooms(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Facilities</label>
          <div className="flex flex-wrap gap-2">
            {FACILITIES_OPTIONS.map(option => (
              <label
                key={option}
                className="flex items-center gap-2 border rounded px-3 py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={facilities.includes(option)}
                  onChange={() => handleFacilityChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
        >
          {loading ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </section>
  );
};

export default AddPropertyPage;
