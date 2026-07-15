import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMyBookings } from "../../services/api/booking.api";

import { useNavigate } from "react-router-dom";


function MyBookings() {
    
    const [bookings, setBookings] = useState([]);
    
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    // ==========================
    // Fetch My Bookings
    // ==========================

    const fetchBookings = async () => {

        try {

            const data = await getMyBookings();

            setBookings(data.bookings);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load bookings");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBookings();

    }, []);

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <h2 className="text-2xl font-semibold">

                    Loading Bookings...

                </h2>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto py-10 px-4">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold">

                    My Bookings

                </h1>

                <p className="text-gray-500 mt-2">

                    Track all your booking requests.

                </p>

            </div>

            {

                bookings.length === 0 ? (

                    <div className="bg-white rounded-xl shadow p-10 text-center">

                        <h2 className="text-2xl font-bold text-gray-700">

                            No Bookings Found

                        </h2>

                        <p className="text-gray-500 mt-3">

                            You haven't booked any property yet.

                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 gap-6">
                                                {bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >

                                {/* Property Image */}

                                <img
                                    src={
                                        booking.property?.images?.length
                                            ? booking.property.images[0]
                                            : "https://placehold.co/600x400?text=No+Image"
                                    }
                                    alt={booking.property?.title}
                                    className="w-full h-56 object-cover"
                                />

                                <div className="p-6">

                                    {/* Property */}

                                    <h2 className="text-2xl font-bold">

                                        {booking.property?.title}

                                    </h2>

                                    <p className="text-gray-500 mt-2">

                                        {booking.property?.locality},{" "}
                                        {booking.property?.city}

                                    </p>

                                    <p className="text-blue-600 text-xl font-bold mt-4">

                                        ₹{booking.property?.rent}/month

                                    </p>

                                    <hr className="my-5" />

                                    {/* Owner Details */}

                                    <h3 className="text-lg font-semibold">

                                        Owner Details

                                    </h3>

                                    <div className="mt-3 space-y-2">

                                        <p>

                                            <strong>Name:</strong>{" "}

                                            {booking.owner?.name}

                                        </p>

                                        <p>

                                            <strong>Email:</strong>{" "}

                                            {booking.owner?.email}

                                        </p>

                                        <p>

                                            <strong>Mobile:</strong>{" "}

                                            {booking.owner?.mobile}

                                        </p>

                                    </div>

                                    <hr className="my-5" />

                                    {/* Booking Date */}

                                    <p className="text-gray-600">

                                        <strong>Requested On:</strong>{" "}

                                        {new Date(
                                            booking.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <div className="mt-5 flex justify-between items-center">

    <span
        className={`px-4 py-2 rounded-full text-sm font-semibold ${
            booking.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : booking.status === "Accepted"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
        }`}
    >
        {booking.status}
    </span>

    {booking.status === "Accepted" && (

        <button

            onClick={() =>
                navigate(`/tenant/chat/${booking._id}`)
            }

            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"

        >
            Open Chat
        </button>

    )}

</div>

                                </div>

                            </div>

                        ))}
                                            </div>

                )

            }

        </div>

    );

}

export default MyBookings;