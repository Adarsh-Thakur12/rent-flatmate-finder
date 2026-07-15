import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getRecommendations } from "../../services/api/recommendation.api";

function Recommendation() {

    const [recommendations, setRecommendations] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchRecommendations();

    }, []);

    const fetchRecommendations = async () => {

        try {

            const data = await getRecommendations();

            setRecommendations(
                data.recommendations
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load recommendations"
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <h2 className="text-2xl font-semibold">

                    Generating AI Recommendations...

                </h2>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto py-10 px-4">

            <div className="mb-8">

                <h1 className="text-4xl font-bold">

                    AI Property Recommendations

                </h1>

                <p className="text-gray-500 mt-2">

                    Properties ranked according to your compatibility score.

                </p>

            </div>

            {

                recommendations.length === 0 ? (

                    <div className="bg-white shadow rounded-xl p-10 text-center">

                        <h2 className="text-2xl font-bold">

                            No Recommendations Found

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Please try again later.

                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {recommendations.map((item) => (

                            <div
                                key={item.property._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >

                                {/* Property Image */}

                                <img
                                    src={
                                        item.property.images?.length
                                            ? item.property.images[0]
                                            : "https://placehold.co/600x400?text=No+Image"
                                    }
                                    alt={item.property.title}
                                    className="w-full h-56 object-cover"
                                />

                                <div className="p-6">

                                    {/* Title */}

                                    <h2 className="text-2xl font-bold">

                                        {item.property.title}

                                    </h2>

                                    {/* Location */}

                                    <p className="text-gray-500 mt-2">

                                        {item.property.locality},{" "}
                                        {item.property.city}

                                    </p>

                                    {/* Rent */}

                                    <p className="text-blue-600 text-2xl font-bold mt-4">

                                        ₹{item.property.rent}/month

                                    </p>

                                    {/* Compatibility Score */}

                                    <div className="mt-5">

                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                                            ⭐ {item.score}% Match

                                        </span>

                                    </div>

                                    {/* AI Explanation */}

                                    <div className="mt-5">

                                        <h3 className="font-semibold mb-2">

                                            Why Recommended?

                                        </h3>

                                        <p className="text-gray-600 text-sm leading-6">

                                            {item.explanation}

                                        </p>

                                    </div>

                                    {/* View Details */}

                                    <Link
                                        to={`/property/${item.property._id}`}
                                    >

                                        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">

                                            View Property

                                        </button>

                                    </Link>

                                </div>

                            </div>

                        ))}
                                            </div>

                )

            }

        </div>

    );

}

export default Recommendation;