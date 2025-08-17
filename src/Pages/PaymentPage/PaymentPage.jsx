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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        Loading payment details...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Complete Your Payment
      </h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 space-y-3 border border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">🏠 Property:</span>{' '}
            {offer.propertyTitle}
          </p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">🧑 Agent:</span> {offer.agentName}
          </p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">💵 Offer Amount:</span>{' '}
            <span className="text-green-600 dark:text-green-400 font-medium">
              ${offer.offerAmount?.toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <Elements stripe={stripePromise}>
          <CheckoutForm offer={offer} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
