import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const CheckoutForm = ({ offer, clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error(error);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error(confirmError);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      await axiosSecure.patch(`/offers/${offer._id}`, {
        status: 'paid',
        transactionId: paymentIntent.id,
      });

      onPaymentSuccess({
        transactionId: paymentIntent.id,
        offerAmount: offer.offerAmount,
        propertyTitle: offer.propertyTitle,
      });
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement className="border p-4 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>

      {transactionId && (
        <p className="text-green-600 font-medium">
          Payment successful! Transaction ID: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
