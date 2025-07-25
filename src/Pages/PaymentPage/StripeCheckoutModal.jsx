// src/Pages/PaymentPage/StripeCheckoutModal.jsx

import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const StripeCheckoutModal = ({ property, user, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axiosSecure.post('/create-payment-intent', {
          price: property.minPrice,
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        toast.error('Failed to initialize payment', err);
      }
    };
    createPaymentIntent();
  }, [axiosSecure, property.minPrice]);

  const handlePayment = async e => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
          return_url: window.location.href,
        });

      if (confirmError) {
        toast.error(confirmError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await axiosSecure.post('/payments', {
          propertyId: property._id,
          buyerEmail: user?.email,
          price: property.minPrice,
          transactionId: paymentIntent.id,
          propertyTitle: property.title,
          location: property.location,
          agentName: property.agentName,
        });

        toast.success('Payment Successful!');
        closeModal();
      }
    } catch (err) {
      toast.error('Payment failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg relative">
        <h2 className="text-xl font-bold mb-4">Pay ${property.minPrice}</h2>

        <form onSubmit={handlePayment}>
          <div className="border p-3 rounded mb-4">
            <CardElement />
          </div>

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>

        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default StripeCheckoutModal;
