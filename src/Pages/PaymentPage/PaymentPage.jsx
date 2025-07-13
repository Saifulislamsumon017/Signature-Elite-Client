import { useParams } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { offerId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: offer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['single-offer', offerId],
    enabled: !!offerId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offer/${offerId}`);
      return res.data;
    },
    onError: () => {
      toast.error('Failed to fetch offer. Please try again.');
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError || !offer) {
    return (
      <div className="text-center py-10 text-red-600">Offer not found.</div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Complete Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm offer={offer} />
      </Elements>
    </section>
  );
};

export default PaymentPage;
