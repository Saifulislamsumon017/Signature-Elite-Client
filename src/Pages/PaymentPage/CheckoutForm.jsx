import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';

const CheckoutForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!offer?.offerAmount || offer.offerAmount <= 0) return;
      try {
        const res = await axiosSecure.post('/create-payment-intent', {
          amount: offer.offerAmount,
        });
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error('PaymentIntent error:', error);
        toast.error('Failed to prepare payment.');
      }
    };

    createPaymentIntent();
  }, [offer, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!clientSecret) {
      toast.error('Payment is not ready. Please refresh.');
      return;
    }

    setProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error('Card details not found.');
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: user?.displayName || 'Anonymous',
              email: user?.email,
            },
          },
        }
      );

      if (error) {
        console.error('Stripe error:', error);
        toast.error(error.message || 'Payment failed.');
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await axiosSecure.patch(`/offer/${offer._id}/pay`, {
          transactionId: paymentIntent.id,
        });
        toast.success('Payment successful!');
        navigate('/dashboard/property-bought');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto border p-6 rounded shadow bg-white"
    >
      <h2 className="text-2xl font-bold mb-4">
        Pay for {offer?.propertyTitle || 'Property'}
      </h2>
      <p className="mb-2">
        Amount:{' '}
        {offer?.offerAmount ? `$${offer.offerAmount.toFixed(2)}` : 'N/A'}
      </p>

      <CardElement className="border p-2 rounded mb-4" />

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
