import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Home, CheckCircle, XCircle, Plus } from "lucide-react";

import { getMyProperties } from "../../services/api/property.api";

function Dashboard() {

    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProperties();

    }, []);

    const fetchProperties = async () => {

        try {

            const data = await getMyProperties();

            setProperties(data.properties);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load dashboard");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <h2 className="text-2xl font-semibold">

                    Loading Dashboard...

                </h2>

            </div>

        );

    }

    const totalProperties = properties.length;

    const availableProperties = properties.filter(
        (property) => !property.isFilled
    ).length;

    const filledProperties = properties.filter(
        (property) => property.isFilled
    ).length;

    return (

        <div className="max-w-7xl mx-auto py-10 px-4">

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Owner Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Welcome back! Here's an overview of your properties.

                </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6">
                            {/* Total Properties */}

                <div className="bg-white shadow-lg rounded-2xl p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">

                                Total Properties

                            </p>

                            <h2 className="text-4xl font-bold mt-2">

                                {totalProperties}

                            </h2>

                        </div>

                        <Home
                            size={42}
                            className="text-blue-600"
                        />

                    </div>

                </div>

                {/* Available */}

                <div className="bg-white shadow-lg rounded-2xl p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">

                                Available

                            </p>

                            <h2 className="text-4xl font-bold mt-2 text-green-600">

                                {availableProperties}

                            </h2>

                        </div>

                        <CheckCircle
                            size={42}
                            className="text-green-600"
                        />

                    </div>

                </div>

                {/* Filled */}

                <div className="bg-white shadow-lg rounded-2xl p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">

                                Filled

                            </p>

                            <h2 className="text-4xl font-bold mt-2 text-red-600">

                                {filledProperties}

                            </h2>

                        </div>

                        <XCircle
                            size={42}
                            className="text-red-600"
                        />

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Quick Actions

                </h2>

                <div className="flex flex-wrap gap-4">

                    <button

                        onClick={() =>
                            navigate("/owner/add-property")
                        }

                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

                    >

                        <Plus size={20} />

                        Add Property

                    </button>

                    <button

                        onClick={() =>
                            navigate("/owner/properties")
                        }

                        className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"

                    >

                        Manage Properties

                    </button>

                </div>

            </div>

            {/* Recent Properties */}

            <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Recent Properties

                </h2>

                {

                    properties.length === 0 ? (

                        <p className="text-gray-500">

                            No properties added yet.

                        </p>

                    ) : (

                        <div className="space-y-4">

                            {

                                properties
                                    .slice(0, 5)
                                    .map((property) => (

                                        <div

                                            key={property._id}

                                            className="flex justify-between items-center border rounded-lg p-4"

                                        >

                                            <div>

                                                <h3 className="font-semibold">

                                                    {property.title}

                                                </h3>

                                                <p className="text-gray-500 text-sm">

                                                    {property.locality},{" "}
                                                    {property.city}

                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <p className="font-bold text-blue-600">

                                                    ₹{property.rent}

                                                </p>

                                                <span
                                                    className={`text-sm ${
                                                        property.isFilled
                                                            ? "text-red-600"
                                                            : "text-green-600"
                                                    }`}
                                                >
                                                    {property.isFilled
                                                        ? "Filled"
                                                        : "Available"}
                                                </span>

                                            </div>

                                        </div>

                                    ))

                            }

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default Dashboard;