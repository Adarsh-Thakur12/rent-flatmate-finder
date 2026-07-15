import api from "../axios";

// ==========================
// Get Chat History
// ==========================
export const getMessages = async (bookingId) => {

    const response = await api.get(
        `/chat/${bookingId}`
    );

    return response.data;

};

// ==========================
// Send Message (Fallback)
// ==========================
export const sendMessage = async (
    bookingId,
    message
) => {

    const response = await api.post(
        `/chat/${bookingId}`,
        {
            message,
        }
    );

    return response.data;

};