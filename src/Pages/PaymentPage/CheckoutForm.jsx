import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      fontFamily: 'Inter, sans-serif',
      '::placeholder': {
        color: '#a0aec0',
      },
    },
    invalid: {
      color: '#e53e3e',
    },
  },
};

const CheckoutForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');
    setSuccess('');

    const card = elements.getElement(CardElement);

    try {
      const { data: clientSecretData } = await axiosSecure.post(
        '/create-payment-intent',
        { amount: offer.offerAmount }
      );

      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(clientSecretData.clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: offer.buyerName,
              email: offer.buyerEmail,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      const paymentResult = await axiosSecure.patch(
        `/offers/pay/${offer._id}`,
        { transactionId: paymentIntent.id }
      );

      if (paymentResult.data.modifiedCount > 0) {
        setSuccess('✅ Payment successful!');
        navigate('/dashboard/property-bought');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg px-4 py-5 shadow-sm">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium -mt-4">{error}</p>
      )}
      {success && (
        <p className="text-green-600 font-semibold text-sm -mt-4">{success}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing Payment...' : `Pay $${offer.offerAmount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
