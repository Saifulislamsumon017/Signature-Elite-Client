import useAxiosSecure from '@/hooks/useAxiosSecure';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';

const PaymentForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handlePayment = async e => {
    e.preventDefault();
    setLoading(true);

    const { data } = await axiosSecure.post('/create-payment-intent', {
      price,
    });
    const clientSecret = data.clientSecret;

    const card = elements.getElement(CardElement);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (paymentResult.error) {
      toast.error(paymentResult.error.message);
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      toast.success('Payment successful!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement className="border p-2 rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default PaymentForm;
