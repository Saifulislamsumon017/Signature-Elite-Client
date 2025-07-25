import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '@/hooks/useAuth';

const DirectCheckoutForm = ({ property }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!property?.maxPrice) return;

    const createPaymentIntent = async () => {
      try {
        const res = await axiosSecure.post('/create-payment-intent', {
          amount: property.maxPrice,
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        Swal.fire('Error', 'Failed to prepare payment.', 'error');
      }
    };

    createPaymentIntent();
  }, [property, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      Swal.fire('Error', 'Card details missing.', 'error');
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
              name: user?.displayName || 'Buyer',
              email: user?.email,
            },
          },
        }
      );

      if (error) {
        Swal.fire(
          'Payment Failed',
          error.message || 'Payment failed.',
          'error'
        );
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        Swal.fire('Success', 'Payment successful!', 'success');
        navigate('/dashboard/property-bought');
      }
    } catch (err) {
      Swal.fire('Error', 'Payment failed.', 'error');
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-6 rounded shadow max-w-md mx-auto"
    >
      <h3 className="text-lg font-bold mb-4">
        Pay ${property?.maxPrice?.toFixed(2)}
      </h3>
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

export default DirectCheckoutForm;
