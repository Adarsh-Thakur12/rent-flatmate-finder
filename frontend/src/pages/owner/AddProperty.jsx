import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PropertyForm from "../../components/property/PropertyForm";
import ImageUploader from "../../components/property/ImageUploader";

import { addProperty } from "../../services/api/property.api";

function AddProperty() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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

        images: [],

    });

    // ==========================
    // Submit Property
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (images.length === 0) {

                toast.error(
                    "Please upload at least one property image."
                );

                setLoading(false);

                return;

            }

            const payload = {

                ...formData,

                rent: Number(formData.rent),

                bhk: Number(formData.bhk),

                bathrooms: Number(formData.bathrooms),

                images,

            };
                        const response = await addProperty(
                payload
            );

            toast.success(
                response.message ||
                "Property added successfully"
            );

            navigate(
                "/owner/properties"
            );

        } catch (error) {

            console.error(error);

            if (
                error.response?.data?.errors
            ) {

                error.response.data.errors.forEach(
                    (err) =>
                        toast.error(err.msg)
                );

            } else {

                toast.error(

                    error.response?.data?.message ||

                    "Failed to add property"

                );

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-7xl mx-auto py-10 px-4">

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Add New Property

                </h1>

                <p className="text-gray-500 mt-2">

                    Fill in the details below to list your property.

                </p>

            </div>

            <form

                onSubmit={handleSubmit}

                className="space-y-10"

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

                {/* Submit Button */}

                <div className="flex justify-end">

                    <button

                        type="submit"

                        disabled={loading}

                        className={`px-8 py-4 rounded-xl text-white font-semibold transition duration-300 ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}

                    >

                        {

                            loading

                                ? "Adding Property..."

                                : "Add Property"

                        }

                    </button>

                </div>
            </form>

            {/* Tips Card */}

            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">

                <h2 className="text-xl font-semibold text-blue-700 mb-3">

                    Tips for Better Listings

                </h2>

                <ul className="list-disc list-inside text-gray-700 space-y-2">

                    <li>
                        Upload clear, high-quality images of your property.
                    </li>

                    <li>
                        Write a detailed description highlighting key features.
                    </li>

                    <li>
                        Mention nearby landmarks, metro stations, or colleges.
                    </li>

                    <li>
                        Keep your rent and amenities information accurate.
                    </li>

                    <li>
                        Properties with multiple images receive more inquiries.
                    </li>

                </ul>

            </div>

        </div>

    );

}

export default AddProperty;
