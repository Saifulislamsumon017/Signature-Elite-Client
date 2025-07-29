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

  // console.log(property);

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

    // console.log(offerData);

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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Make an Offer</h2>

      {/* Offer Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 shadow rounded-md"
      >
        {/* Property Image */}
        <div className="mb-4">
          <img
            src={property?.image}
            alt={property.title}
            className="w-full h-64 object-cover rounded shadow"
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/400x250?text=No+Image';
            }}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Property Title</label>
            <input
              type="text"
              value={property.title}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Location</label>
            <input
              type="text"
              value={property.location}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Agent Name</label>
            <input
              type="text"
              value={property.agentName}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Buyer Name</label>
            <input
              type="text"
              value={user.displayName}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Buyer Email</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Offer Date</label>
            <input
              type="text"
              value={new Date().toLocaleDateString()}
              disabled
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="label">Offer Amount ($)</label>
          <input
            type="number"
            value={offerAmount}
            onChange={e => setOfferAmount(e.target.value)}
            className="input input-bordered w-full"
            placeholder={`Between $${property.minPrice} - $${property.maxPrice}`}
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="btn bg-green-600 text-white hover:bg-green-700"
          >
            Submit Offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeOfferPage;
