import { Link } from "react-router-dom";

function PropertyCard({ property }) {

    return (

        <div className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden">

            <img
                src={
                    property.images?.length > 0
                        ? property.images[0]
                        : "https://placehold.co/600x400?text=No+Image"
                }
                alt={property.title}
                className="w-full h-56 object-cover"
            />

            <div className="p-5">

                <div className="flex justify-between items-center">

                    <h2 className="text-xl font-bold">

                        {property.title}

                    </h2>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                        {property.bhk} BHK

                    </span>

                </div>

                <p className="text-gray-500 mt-2">

                    {property.locality}, {property.city}

                </p>

                <div className="flex justify-between mt-5">

                    <span className="text-2xl font-bold text-blue-600">

                        ₹{property.rent}

                    </span>

                    <span>

                        {property.furnished}

                    </span>

                </div>

                <Link
                    to={`/property/${property._id}`}
                >

                    <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">

                        View Details

                    </button>

                </Link>

            </div>

        </div>

    );

}

export default PropertyCard;