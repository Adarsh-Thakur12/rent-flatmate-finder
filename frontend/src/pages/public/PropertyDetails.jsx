import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthContext } from "../../context/AuthContext";
import { getPropertyById } from "../../services/api/property.api";
import {
    addFavorite,
    removeFavorite,
    getMyFavorites
} from "../../services/api/favorite.api";
import { getCompatibility } from "../../services/api/compatibility.api";
import { createBooking } from "../../services/api/booking.api";
function PropertyDetails() {

    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [compatibility, setCompatibility] = useState(null);

    const [compatibilityLoading, setCompatibilityLoading] =useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingRequested, setBookingRequested] = useState(false);
    const fetchProperty = async () => {
        try {
            const data = await getPropertyById(id);
            setProperty(data.property);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load property");
        } finally {
            setLoading(false);
        }
    };

    const checkFavorite = async () => {
        if (!user || user.role !== "tenant") return;

        try {
            const data = await getMyFavorites();
            const exists = data.favorites.some(
                (fav) => fav.property?._id === id
            );
            setIsFavorite(exists);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProperty();
        checkFavorite();
    }, [id, user]);

    const handleFavorite = async () => {
        try {
            setFavoriteLoading(true);

            if (isFavorite) {
                const res = await removeFavorite(id);
                toast.success(res.message);
                setIsFavorite(false);
            } else {
                const res = await addFavorite(id);
                toast.success(res.message);
                setIsFavorite(true);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setFavoriteLoading(false);
        }
    };
    // ==========================
// Check Compatibility
// ==========================

const handleCheckCompatibility = async () => {

    try {

        setCompatibilityLoading(true);

        const response = await getCompatibility(
            property._id
        );

        setCompatibility(
            response.compatibility
        );

        toast.success(
            response.message ||
            "Compatibility generated successfully"
        );

    } catch (error) {

        console.error(error);

        toast.error(

            error.response?.data?.message ||

            "Failed to generate compatibility"

        );

    } finally {

        setCompatibilityLoading(false);

    }

    };
// ==========================
// Book Property
// ==========================

const handleBooking = async () => {

    try {

        setBookingLoading(true);

        const response = await createBooking(property._id);

        toast.success(
            response.message ||
            "Booking request sent successfully"
        );

        setBookingRequested(true);

    } catch (error) {

        console.error(error);

        const message =
            error?.response?.data?.message ||
            "Failed to create booking";

        if (message === "Booking request already sent") {

            setBookingRequested(true);

        }

        toast.error(message);

    } finally {

        setBookingLoading(false);

    }

};
    if (loading) {
        return (
            <div className="text-center py-20 text-xl">
                Loading Property...
            </div>
        );
    }

    if (!property) {
        return (
            <div className="text-center py-20 text-red-600">
                Property Not Found
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-10">
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <img
                        src={
                            property.images?.length
                                ? property.images[0]
                                : "https://placehold.co/700x450?text=No+Image"
                        }
                        alt={property.title}
                        className="w-full h-[420px] object-cover rounded-xl"
                    />
                </div>

                <div>
                    <h1 className="text-4xl font-bold">{property.title}</h1>

                    <p className="text-gray-500 mt-3">
                        {property.locality}, {property.city}
                    </p>

                    <h2 className="text-4xl font-bold text-blue-600 mt-6">
                        ₹{property.rent}/month
                    </h2>

                    <div className="grid grid-cols-2 gap-5 mt-8">
                        <div><p className="text-gray-500">BHK</p><p>{property.bhk}</p></div>
                        <div><p className="text-gray-500">Bathrooms</p><p>{property.bathrooms}</p></div>
                        <div><p className="text-gray-500">Furnished</p><p>{property.furnished}</p></div>
                        <div><p className="text-gray-500">Parking</p><p>{property.parking ? "Available" : "Not Available"}</p></div>
                        <div><p className="text-gray-500">Gender Preference</p><p>{property.genderPreference}</p></div>
                    </div>

                    <hr className="my-8" />

                    <h2 className="text-2xl font-bold">Description</h2>
                    <p className="mt-3 text-gray-700">{property.description}</p>

                    <hr className="my-8" />
                                        <hr className="my-8" />

                    {/* Compatibility */}

                    <div>

                        <h2 className="text-2xl font-bold mb-5">

                            AI Compatibility

                        </h2>

                        {

                            compatibility ? (

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">

                                    <div className="flex items-center justify-between">

                                        <h3 className="text-xl font-semibold">

                                            Compatibility Score

                                        </h3>

                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">

                                            ⭐ {compatibility.score}%

                                        </span>

                                    </div>

                                    <p className="mt-5 text-gray-700 leading-7">

                                        {compatibility.explanation}

                                    </p>

                                </div>

                            ) : (

                                <div className="bg-gray-50 border rounded-xl p-6">

                                    <p className="text-gray-600 mb-5">

                                        Find out how well this property matches your preferences using our AI compatibility engine.

                                    </p>

                                    {

                                        user?.role === "tenant" && (

                                            <button

                                                onClick={handleCheckCompatibility}

                                                disabled={compatibilityLoading}

                                                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"

                                            >

                                                {

                                                    compatibilityLoading

                                                        ? "Generating..."

                                                        : "✨ Check Compatibility"

                                                }

                                            </button>

                                        )

                                    }

                                </div>

                            )

                        }

                    </div>

                    <h2 className="text-2xl font-bold">Owner Details</h2>

                    <div className="mt-4 space-y-2">
                        <p><strong>Name:</strong> {property.owner?.name}</p>
                        <p><strong>Email:</strong> {property.owner?.email}</p>
                        <p><strong>Mobile:</strong> {property.owner?.mobile}</p>
                    </div>
                        
                    <div className="flex gap-4 mt-10">
                       {user?.role === "tenant" && (
                       <button

                        onClick={handleBooking}

                        disabled={bookingLoading || bookingRequested}

                        className={`px-6 py-3 rounded-lg text-white transition ${
                            bookingRequested
                                ? "bg-green-600 cursor-not-allowed"
                                : bookingLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}

                    >

                        {

                            bookingLoading

                                ? "Sending..."

                                : bookingRequested

                                ? "Booking Requested"

                                : "Book Property"

                        }

                    </button>
                    )}
                        {user?.role === "tenant" && (
                            <button
                                onClick={handleFavorite}
                                disabled={favoriteLoading}
                                className={`px-6 py-3 rounded-lg transition ${
                                    isFavorite
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : "border border-red-500 text-red-500 hover:bg-red-50"
                                }`}
                            >
                                {favoriteLoading
                                    ? "Please wait..."
                                    : isFavorite
                                    ? "❤️ Remove Favorite"
                                    : "🤍 Add Favorite"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;
