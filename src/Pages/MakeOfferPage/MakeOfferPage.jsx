import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useUserRole from '@/hooks/useUserRole';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';

const MakeOfferPage = () => {
  const { user } = useAuth();
  const [role] = useUserRole();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { state } = useLocation();

  const property = state?.property;
  const [offerAmount, setOfferAmount] = useState('');

  if (!property) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        No property data found. Please go back to your wishlist.
      </div>
    );
  }

  if (role !== 'user') {
    return (
      <div className="text-center mt-10 text-red-500 text-lg font-medium">
        Only users can make an offer. Agents and Admins are not allowed.
      </div>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const numericOffer = parseFloat(offerAmount);

    if (
      isNaN(numericOffer) ||
      numericOffer < property.minPrice ||
      numericOffer > property.maxPrice
    ) {
      toast.error(
        `Offer must be between $${property.minPrice} and $${property.maxPrice}`
      );
      return;
    }

    const offerData = {
      propertyId: property._id,
      propertyImage: property.image,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      buyerName: user.displayName,
      buyerEmail: user.email,
      offerAmount: numericOffer,
      offerStatus: 'pending',
      isPaid: false,
      offerDate: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/offers', offerData);
      if (res.data.insertedId) {
        toast.success('Offer submitted successfully!');
        navigate('/dashboard/property-bought');
      } else {
        toast.error('Failed to submit offer');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Make an Offer
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 md:p-10 shadow-md rounded-lg space-y-6 border dark:border-gray-700"
      >
        {/* Image */}
        <img
          src={property.image}
          alt={property.title}
          onError={e => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
          }}
          className="w-full h-64 object-cover rounded-md border"
        />

        {/* Property Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            ['Property Title', property.title],
            ['Location', property.location],
            ['Agent Name', property.agentName],
            ['Buyer Name', user.displayName],
            ['Buyer Email', user.email],
            ['Offer Date', new Date().toLocaleDateString()],
          ].map(([label, value], idx) => (
            <div key={idx}>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                {label}
              </label>
              <input
                type="text"
                value={value}
                disabled
                className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white"
              />
            </div>
          ))}
        </div>

        {/* Offer Amount */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            Offer Amount ($)
          </label>
          <input
            type="number"
            value={offerAmount}
            onChange={e => setOfferAmount(e.target.value)}
            placeholder={`Between $${property.minPrice} - $${property.maxPrice}`}
            required
            className="w-full border rounded px-4 py-2 focus:outline-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/wishlist')}
            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-5 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded transition"
          >
            Submit Offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeOfferPage;
