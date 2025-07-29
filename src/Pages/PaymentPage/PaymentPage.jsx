import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: offer = {}, isLoading } = useQuery({
    queryKey: ['singleOffer', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

      <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
        <p>
          <strong>Property:</strong> {offer.propertyTitle}
        </p>
        <p>
          <strong>Agent:</strong> {offer.agentName}
        </p>
        <p>
          <strong>Offered Amount:</strong> ${offer.offerAmount}
        </p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm offer={offer} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
