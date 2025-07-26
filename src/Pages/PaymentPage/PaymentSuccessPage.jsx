import React from 'react';
import { useLocation } from 'react-router';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { transactionId, offerAmount, propertyTitle } = location.state || {};

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-600">
        Payment Successful!
      </h1>
      <div className="text-center mb-6">
        <p className="text-lg font-semibold mb-2">
          Thank you for your purchase!
        </p>
        <p>
          Your payment of ${offerAmount} for the property "{propertyTitle}" was
          successful.
        </p>
      </div>
      <div className="text-center">
        <p>
          Transaction ID: <span className="font-medium">{transactionId}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
