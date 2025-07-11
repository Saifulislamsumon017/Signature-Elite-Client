import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const MakeOfferPage = () => {
  const { propertyId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [buyingDate, setBuyingDate] = useState('');

  // ✅ Fetch property details
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${propertyId}`);
      return res.data;
    },
  });

  // ✅ Offer mutation
  const offerMutation = useMutation({
    mutationFn: async offerData => {
      await axiosSecure.post('/offers', offerData);
    },
    onSuccess: () => {
      toast.success('Offer submitted successfully!');
      navigate('/dashboard/property-bought');
    },
    onError: () => {
      toast.error('Failed to submit offer.');
    },
  });

  const [offerAmount, setOfferAmount] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!property) return;

    // ✅ Validate price range
    const min = property.minPrice;
    const max = property.maxPrice;
    const offerNum = parseInt(offerAmount);

    if (isNaN(offerNum) || offerNum < min || offerNum > max) {
      toast.error(`Offer must be between $${min} and $${max}`);
      return;
    }

    const offerData = {
      propertyId,
      propertyTitle: property.title,
      location: property.location,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      offerAmount: offerNum,
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate,
      status: 'pending',
    };

    offerMutation.mutate(offerData);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (!property)
    return (
      <div className="text-center py-10 text-red-600">Property not found.</div>
    );

  return (
    <section className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Make an Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Property Title</label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Agent Name</label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Offer Amount (between ${property.minPrice} - ${property.maxPrice})
          </label>
          <input
            type="number"
            value={offerAmount}
            onChange={e => setOfferAmount(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Buying Date</label>
          <input
            type="date"
            value={buyingDate}
            onChange={e => setBuyingDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Buyer Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Buyer Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={offerMutation.isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {offerMutation.isLoading ? 'Submitting...' : 'Submit Offer'}
        </button>
      </form>
    </section>
  );
};

export default MakeOfferPage;
