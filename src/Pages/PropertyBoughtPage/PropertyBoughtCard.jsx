import React from 'react';
import { Link } from 'react-router';

const PropertyBoughtCard = ({ offer }) => {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition duration-200 bg-white">
      <img
        src={offer.propertyImage}
        alt={offer.propertyTitle}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{offer.propertyTitle}</h3>
        <p className="text-gray-600">{offer.location}</p>
        <p className="mt-1 text-indigo-600 font-semibold">
          Offered: ${offer.offerAmount.toLocaleString()}
        </p>
        <div className="mt-2">
          <span
            className={`inline-block px-2 py-1 text-xs rounded 
            ${
              offer.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : offer.status === 'accepted'
                ? 'bg-green-100 text-green-800'
                : offer.status === 'bought'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {offer.status}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-sm">Agent: {offer.agentName}</p>
          {offer.status === 'accepted' && (
            <Link
              to={`/payment/${offer._id}`}
              className="inline-block mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Pay
            </Link>
          )}
          {offer.status === 'bought' && (
            <p className="mt-3 text-sm text-green-700">
              Payment Completed - TxID: {offer.transactionId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyBoughtCard;
