import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import CheckoutForm from './CheckoutForm';
import { useNavigate, useParams } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axiosSecure.get(`/offers/${id}`);
        setOffer(res.data);

        const paymentIntentRes = await axiosSecure.post(
          '/create-payment-intent',
          { amount: res.data.offerAmount }
        );

        setClientSecret(paymentIntentRes.data.clientSecret);
      } catch (error) {
        console.error('Error fetching offer/payment:', error);
      }
    };

    fetchOffer();
  }, [id, axiosSecure]);

  if (!offer) return <p className="text-center mt-10">Loading offer...</p>;
  if (!clientSecret)
    return <p className="text-center mt-10">Loading payment form...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Pay for: {offer.propertyTitle}
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Amount: <strong>${offer.offerAmount}</strong>
      </p>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm
          offer={offer}
          clientSecret={clientSecret}
          onPaymentSuccess={info =>
            navigate('/dashboard/payment-success', { state: info })
          }
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;
