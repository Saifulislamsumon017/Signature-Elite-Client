import { Link } from 'react-router';

const PropertyCard = ({ property }) => {
  return (
    <div className="border rounded shadow p-4">
      <img
        src={property.image}
        alt={property.title}
        className="h-48 w-full object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-bold">{property.title}</h3>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-green-600 font-semibold">
        ৳ {property.minPrice} - {property.maxPrice}
      </p>
      <p
        className={
          property.verificationStatus === 'verified'
            ? 'text-green-500'
            : 'text-red-500'
        }
      >
        {property.verificationStatus}
      </p>
      <Link
        to={`/property/${property._id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded"
      >
        Details
      </Link>
    </div>
  );
};

export default PropertyCard;
