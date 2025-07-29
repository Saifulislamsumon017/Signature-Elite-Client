import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
    const card = elements.getElement(CardElement);

    try {
      // Create payment intent
      const { data: clientSecretData } = await axiosSecure.post(
        '/create-payment-intent',
        {
          amount: offer.offerAmount,
        }
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

      // Save payment info to DB
      const paymentResult = await axiosSecure.patch(
        `/offers/pay/${offer._id}`,
        {
          transactionId: paymentIntent.id,
        }
      );

      if (paymentResult.data.modifiedCount > 0) {
        setSuccess('Payment successful!');
        navigate('/dashboard/property-bought');
      }
    } catch (err) {
      setError('Payment failed. Please try again.', err);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded" />
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${offer.offerAmount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
