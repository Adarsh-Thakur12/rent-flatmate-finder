import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    Home,
    Heart,
    CheckCircle,
    Clock,
} from "lucide-react";

import { getMyBookings } from "../../services/api/booking.api";
import { getMyFavorites } from "../../services/api/favorite.api";

function Dashboard() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);

    const [favorites, setFavorites] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            const bookingData = await getMyBookings();

            const favoriteData = await getMyFavorites();

            setBookings(bookingData.bookings);

            setFavorites(favoriteData.favorites);

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

    const totalBookings = bookings.length;

    const acceptedBookings = bookings.filter(
        booking => booking.status === "Accepted"
    ).length;

    const pendingBookings = bookings.filter(
        booking => booking.status === "Pending"
    ).length;

    const totalFavorites = favorites.length;

    return (

        <div className="max-w-7xl mx-auto py-10 px-4">

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Tenant Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Welcome back! Here's an overview of your activity.

                </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Total Bookings */}

                <div className="bg-white shadow rounded-xl p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">

                                Total Bookings

                            </p>

                            <h2 className="text-3xl font-bold mt-2">

                                {totalBookings}

                            </h2>

                        </div>

                        <Home
                            size={40}
                            className="text-blue-600"
                        />

                    </div>

                </div>

                {/* Favorites */}

                <div className="bg-white shadow rounded-xl p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">

                                Favorites

                            </p>

                            <h2 className="text-3xl font-bold mt-2">

                                {totalFavorites}

                            </h2>

                        </div>

                        <Heart
                            size={40}
                            className="text-red-500"
                        />

                    </div>

                </div>

                {/* Accepted */}

                <div className="bg-white shadow rounded-xl p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">

                                Accepted

                            </p>

                            <h2 className="text-3xl font-bold mt-2 text-green-600">

                                {acceptedBookings}

                            </h2>

                        </div>

                        <CheckCircle
                            size={40}
                            className="text-green-600"
                        />

                    </div>

                </div>

                {/* Pending */}

                <div className="bg-white shadow rounded-xl p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">

                                Pending

                            </p>

                            <h2 className="text-3xl font-bold mt-2 text-yellow-600">

                                {pendingBookings}

                            </h2>

                        </div>

                        <Clock
                            size={40}
                            className="text-yellow-600"
                        />

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="mt-10 bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold mb-5">

                    Quick Actions

                </h2>

                <div className="flex flex-wrap gap-4">

                    <button

                        onClick={() => navigate("/")}

                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

                    >

                        Browse Properties

                    </button>

                    <button

                        onClick={() =>
                            navigate("/tenant/favorites")
                        }

                        className="border border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50"

                    >

                        My Favorites

                    </button>

                    <button

                        onClick={() =>
                            navigate("/tenant/bookings")
                        }

                        className="border border-green-500 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50"

                    >

                        My Bookings

                    </button>

                </div>

            </div>

            {/* Recent Bookings */}

            <div className="mt-10 bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-bold mb-5">

                    Recent Bookings

                </h2>

                {

                    bookings.length === 0 ? (

                        <p className="text-gray-500">

                            No bookings found.

                        </p>

                    ) : (

                        <div className="space-y-4">

                            {

                                bookings
                                    .slice(0, 5)
                                    .map((booking) => (

                                        <div
                                            key={booking._id}
                                            className="flex justify-between items-center border rounded-lg p-4"
                                        >

                                            <div>

                                                <h3 className="font-semibold">

                                                    {booking.property?.title}

                                                </h3>

                                                <p className="text-sm text-gray-500">

                                                    {booking.property?.locality},{" "}
                                                    {booking.property?.city}

                                                </p>

                                            </div>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    booking.status === "Accepted"
                                                        ? "bg-green-100 text-green-700"
                                                        : booking.status === "Rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >

                                                {booking.status}

                                            </span>

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