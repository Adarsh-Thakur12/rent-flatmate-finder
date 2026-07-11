import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getPropertyBookings,
    acceptBooking,
    rejectBooking,
} from "../../services/api/booking.api";

function BookingRequests() {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    // ==========================
    // Fetch Booking Requests
    // ==========================

    const fetchBookings = async () => {

        try {

            const data = await getPropertyBookings();

            setBookings(data.bookings);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load booking requests");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBookings();

    }, []);

    // ==========================
    // Accept Booking
    // ==========================

    const handleAccept = async (bookingId) => {

        try {

            const response = await acceptBooking(
                bookingId
            );

            toast.success(response.message);

            fetchBookings();

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to accept booking"

            );

        }

    };

    // ==========================
    // Reject Booking
    // ==========================

    const handleReject = async (bookingId) => {
                try {

            const response = await rejectBooking(
                bookingId
            );

            toast.success(response.message);

            fetchBookings();

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to reject booking"

            );

        }

    };

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <h2 className="text-2xl font-semibold">

                    Loading Booking Requests...

                </h2>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto py-10 px-4">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold">

                    Booking Requests

                </h1>

                <p className="text-gray-500 mt-2">

                    Review and manage all booking requests for your properties.

                </p>

            </div>

            {

                bookings.length === 0 ? (

                    <div className="bg-white rounded-xl shadow p-10 text-center">

                        <h2 className="text-2xl font-bold text-gray-700">

                            No Booking Requests

                        </h2>

                        <p className="text-gray-500 mt-3">

                            You haven't received any booking requests yet.

                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 gap-6">                        {bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="bg-white rounded-xl shadow-lg p-6 border"
                            >

                                {/* Property */}

                                <div className="mb-5">

                                    <img
                                        src={
                                            booking.property?.images?.length
                                                ? booking.property.images[0]
                                                : "https://placehold.co/600x400?text=No+Image"
                                        }
                                        alt={booking.property?.title}
                                        className="w-full h-52 object-cover rounded-lg"
                                    />

                                </div>

                                <h2 className="text-2xl font-bold">

                                    {booking.property?.title}

                                </h2>

                                <p className="text-gray-500 mt-1">

                                    {booking.property?.locality},{" "}
                                    {booking.property?.city}

                                </p>

                                <p className="mt-3">

                                    <strong>Rent:</strong> ₹
                                    {booking.property?.rent}/month

                                </p>

                                <hr className="my-5" />

                                {/* Tenant Details */}

                                <h3 className="text-lg font-semibold">

                                    Tenant Details

                                </h3>

                                <p className="mt-3">

                                    <strong>Name:</strong>{" "}

                                    {booking.tenant?.name}

                                </p>

                                <p>

                                    <strong>Email:</strong>{" "}

                                    {booking.tenant?.email}

                                </p>

                                <p>

                                    <strong>Mobile:</strong>{" "}

                                    {booking.tenant?.mobile}

                                </p>

                                <hr className="my-5" />

                                {/* Status */}

                                <div className="flex justify-between items-center">

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                                            booking.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : booking.status === "Accepted"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >

                                        {booking.status}

                                    </span>

                                    {

                                        booking.status === "Pending" && (

                                            <div className="flex gap-3">

                                                <button

                                                    onClick={() =>
                                                        handleAccept(
                                                            booking._id
                                                        )
                                                    }

                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"

                                                >

                                                    Accept

                                                </button>

                                                <button

                                                    onClick={() =>
                                                        handleReject(
                                                            booking._id
                                                        )
                                                    }

                                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"

                                                >

                                                    Reject

                                                </button>

                                            </div>

                                        )

                                    }

                                </div>

                            </div>

                        ))}

                    </div>

                )

            }

        </div>

    );

}

export default BookingRequests;