import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PropertyTable from "../../components/property/PropertyTable";

import {
    getMyProperties,
    deleteProperty,
    markPropertyFilled,
} from "../../services/api/property.api";

function MyProperties() {

    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);

    // ==========================
    // Fetch Properties
    // ==========================

    const fetchProperties = async () => {

        try {

            const data = await getMyProperties();

            setProperties(data.properties);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load properties");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProperties();

    }, []);

    // ==========================
    // Delete Property
    // ==========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) return;

        try {

            const response = await deleteProperty(id);

            toast.success(response.message);

            fetchProperties();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete property"
            );

        }

    };

    // ==========================
    // Mark Filled
    // ==========================

    const handleMarkFilled = async (id) => {
                try {

            const response = await markPropertyFilled(id);

            toast.success(response.message);

            fetchProperties();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update property"
            );

        }

    };

    // ==========================
    // Edit Property
    // ==========================

    const handleEdit = (property) => {

        navigate(
            `/owner/edit-property/${property._id}`
        );

    };

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <div className="text-xl font-semibold">

                    Loading Properties...

                </div>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto py-10 px-4">

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        My Properties

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage all your listed properties.

                    </p>

                </div>

                <button

                    onClick={() =>
                        navigate("/owner/add-property")
                    }

                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

                >

                    + Add Property

                </button>

            </div>
                        {/* Property Table */}

            <PropertyTable

                properties={properties}

                onEdit={handleEdit}

                onDelete={handleDelete}

                onMarkFilled={handleMarkFilled}

            />

            {/* Empty State */}

            {

                properties.length === 0 && (

                    <div className="mt-10 bg-white rounded-xl shadow p-10 text-center">

                        <h2 className="text-2xl font-bold text-gray-700">

                            No Properties Listed

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Click on <strong>Add Property</strong> to create your first listing.

                        </p>

                        <button

                            onClick={() =>
                                navigate("/owner/add-property")
                            }

                            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

                        >

                            Add Property

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default MyProperties;