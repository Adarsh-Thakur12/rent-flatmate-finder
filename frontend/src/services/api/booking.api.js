import api from "../axios";

// ==========================
// Get Owner Booking Requests
// ==========================
export const getPropertyBookings = async () => {

    const response = await api.get(
        "/booking/property-bookings"
    );

    return response.data;

};

// ==========================
// Accept Booking
// ==========================
export const acceptBooking = async (bookingId) => {

    const response = await api.patch(
        `/booking/${bookingId}/accept`
    );

    return response.data;

};

// ==========================
// Reject Booking
// ==========================
export const rejectBooking = async (bookingId) => {

    const response = await api.patch(
        `/booking/${bookingId}/reject`
    );

    return response.data;

};