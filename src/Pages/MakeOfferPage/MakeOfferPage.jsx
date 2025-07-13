import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const MakeOfferPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const [offerAmount, setOfferAmount] = useState('');
  const [buyingDate, setBuyingDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosSecure.get(`/property/${propertyId}`);
        setProperty(res.data);
      } catch (err) {
        console.error('Failed to fetch property', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, axiosSecure]);

  const validate = () => {
    const newErrors = {};
    const amount = parseFloat(offerAmount);

    if (!offerAmount) {
      newErrors.offerAmount = 'Offer amount is required';
    } else if (isNaN(amount)) {
      newErrors.offerAmount = 'Offer amount must be a number';
    } else if (
      property &&
      (amount < property.minPrice || amount > property.maxPrice)
    ) {
      newErrors.offerAmount = `Offer must be between ${property.minPrice} and ${property.maxPrice}`;
    }

    if (!buyingDate) {
      newErrors.buyingDate = 'Buying date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    const offerData = {
      propertyId,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agentName,
      buyerEmail: user.email,
      buyerName: user.displayName || user.email,
      offerAmount: parseFloat(offerAmount),
      buyingDate,
      status: 'pending',
    };

    try {
      await axiosSecure.post('/offers', offerData);
      alert('Offer submitted successfully!');
      navigate('/dashboard/property-bought');
    } catch (err) {
      console.error('Offer submission failed', err);
      alert('Failed to submit offer');
    }
  };

  if (loading) return <div>Loading property details...</div>;
  if (!property) return <div>Property not found.</div>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem' }}>
      <h2>Make an Offer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Property Title</label>
          <input type="text" value={property.title} readOnly />
        </div>
        <div>
          <label>Property Location</label>
          <input type="text" value={property.location} readOnly />
        </div>
        <div>
          <label>Agent Name</label>
          <input type="text" value={property.agentName} readOnly />
        </div>
        <div>
          <label>Buyer Email</label>
          <input type="text" value={user.email} readOnly />
        </div>
        <div>
          <label>Buyer Name</label>
          <input type="text" value={user.displayName || user.email} readOnly />
        </div>

        <div>
          <label>Offer Amount</label>
          <input
            type="number"
            step="0.01"
            value={offerAmount}
            onChange={e => setOfferAmount(e.target.value)}
            placeholder={`Between ${property.minPrice} and ${property.maxPrice}`}
          />
          {errors.offerAmount && (
            <p style={{ color: 'red' }}>{errors.offerAmount}</p>
          )}
        </div>

        <div>
          <label>Buying Date</label>
          <input
            type="date"
            value={buyingDate}
            onChange={e => setBuyingDate(e.target.value)}
          />
          {errors.buyingDate && (
            <p style={{ color: 'red' }}>{errors.buyingDate}</p>
          )}
        </div>

        <button type="submit">Submit Offer</button>
      </form>
    </div>
  );
};

export default MakeOfferPage;
