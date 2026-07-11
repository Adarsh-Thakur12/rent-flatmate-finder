import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PropertyForm from "../../components/property/PropertyForm";
import ImageUploader from "../../components/property/ImageUploader";

import {
    getPropertyById,
    updateProperty,
} from "../../services/api/property.api";

function EditProperty() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [images, setImages] = useState([]);

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        rent: "",

        city: "",

        locality: "",

        address: "",

        bhk: "",

        bathrooms: "",

        furnished: "",

        parking: false,

        genderPreference: "Any",

    });

    // ======================
    // Fetch Property
    // ======================

    const fetchProperty = async () => {

        try {

            const data = await getPropertyById(id);

            const property = data.property;

            setFormData({

                title: property.title,

                description: property.description,

                rent: property.rent,

                city: property.city,

                locality: property.locality,

                address: property.address,

                bhk: property.bhk,

                bathrooms: property.bathrooms,

                furnished: property.furnished,

                parking: property.parking,

                genderPreference: property.genderPreference,

            });

            setImages(property.images);

        } catch (error) {

            toast.error("Failed to load property");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProperty();

    }, []);
        // ======================
    // Update Property
    // ======================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const payload = {

                ...formData,

                rent: Number(formData.rent),

                bhk: Number(formData.bhk),

                bathrooms: Number(formData.bathrooms),

                images,

            };

            const response = await updateProperty(

                id,

                payload

            );

            toast.success(

                response.message ||

                "Property updated successfully"

            );

            navigate("/owner/properties");

        } catch (error) {

            console.error(error);

            if (error.response?.data?.errors) {

                error.response.data.errors.forEach((err) =>

                    toast.error(err.msg)

                );

            } else {

                toast.error(

                    error.response?.data?.message ||

                    "Failed to update property"

                );

            }

        } finally {

            setSaving(false);

        }

    };

    // ======================
    // Loading
    // ======================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <h2 className="text-2xl font-semibold">

                    Loading Property...

                </h2>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto py-10 px-4">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold">

                    Edit Property

                </h1>

                <p className="text-gray-500 mt-2">

                    Update your property information.

                </p>

            </div>

            <form

                onSubmit={handleSubmit}

                className="space-y-8"

            >
                            {/* Image Upload */}

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <ImageUploader
                        images={images}
                        setImages={setImages}
                    />

                </div>

                {/* Property Form */}

                <PropertyForm
                    formData={formData}
                    setFormData={setFormData}
                />

                {/* Buttons */}

                <div className="flex justify-end gap-4">

                    <button
                        type="button"
                        onClick={() => navigate("/owner/properties")}
                        className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className={`px-8 py-3 rounded-lg text-white font-semibold transition ${
                            saving
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Property"}
                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditProperty;

