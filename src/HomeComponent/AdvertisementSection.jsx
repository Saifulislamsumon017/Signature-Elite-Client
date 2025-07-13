import { useNavigate } from 'react-router';

const AdvertisementSection = ({ properties }) => {
  const navigate = useNavigate();

  if (!properties.length) return <p>No advertised properties available.</p>;

  return (
    <section className="advertisement-section p-5">
      <h2 className="text-2xl font-semibold mb-5">Featured Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {properties.slice(0, 4).map(property => (
          <div
            key={property._id}
            className="card border rounded shadow p-3 cursor-pointer"
            onClick={() => navigate(`/property/${property._id}`)}
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 font-bold">{property.title}</h3>
            <p>{property.location}</p>
            <p>
              Price: ${property.minPrice.toLocaleString()} - $
              {property.maxPrice.toLocaleString()}
            </p>
            <p>
              Status:{' '}
              <span className="text-green-600 font-semibold">
                {property.verificationStatus}
              </span>
            </p>
            <button
              onClick={e => {
                e.stopPropagation();
                navigate(`/property/${property._id}`);
              }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;
