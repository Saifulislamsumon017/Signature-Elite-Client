import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router';

const MakeOfferPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const axiosSecure = useAxiosSecure();

  const property = state?.property;
  const [offer, setOffer] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!property) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        No property data found. Please return to your wishlist.
      </div>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (!offer || !message) {
      toast.error('Please provide both offer amount and message');
      return;
    }

    try {
      setLoading(true);
      const res = await axiosSecure.post('/offers', {
        propertyId: property._id,
        userEmail: property.userEmail,
        offerAmount: parseFloat(offer),
        message,
        propertyTitle: property.title,
      });

      if (res.data?.insertedId) {
        toast.success('Offer submitted successfully!');
        navigate('/dashboard/wishlist');
      } else {
        toast.error('Unexpected response. Offer not saved.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit offer. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Make an Offer</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">{property.title}</h2>
          <p className="text-gray-600 text-sm">{property.location}</p>
          <p className="text-gray-700 text-sm">
            Price Range:{' '}
            <span className="font-medium">
              ${property.minPrice?.toLocaleString()} - $
              {property.maxPrice?.toLocaleString()}
            </span>
          </p>
        </div>

        {property.agentName && (
          <div className="flex items-center gap-3">
            <img
              src={property.agentImage}
              alt={property.agentName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{property.agentName}</p>
              <p className="text-xs text-gray-500">{property.userEmail}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Offer Amount ($)
            </label>
            <input
              type="number"
              value={offer}
              onChange={e => setOffer(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your offer amount"
              required
              min={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Add a short message for the agent"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/wishlist')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeOfferPage;
