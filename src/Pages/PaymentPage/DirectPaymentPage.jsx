import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DirectCheckoutForm from './DirectCheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const DirectPaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
    enabled: !!id,
    onError: () => Swal.fire('Error', 'Failed to load property', 'error'),
  });

  if (isLoading) return <p className="text-center mt-6">Loading property...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Pay for {property.title}</h2>
      <p className="mb-2 text-green-600 font-semibold">
        Amount: ${property.maxPrice}
      </p>

      <Elements stripe={stripePromise}>
        <DirectCheckoutForm property={property} />
      </Elements>
    </div>
  );
};

export default DirectPaymentPage;
