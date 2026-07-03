import Message from "../models/Message.js";
import Booking from "../models/Booking.js";
import { getIO } from "../sockets/socket.js";

// ==============================
// Send Message
// ==============================
export const sendMessageService = async (
    senderId,
    bookingId,
    message
) => {

    try {

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return {
                success: false,
                statusCode: 404,
                message: "Booking not found",
            };
        }

        if (booking.status !== "Accepted") {
            return {
                success: false,
                statusCode: 403,
                message: "Chat is allowed only after booking is accepted.",
            };
        }

        let receiverId;

        if (booking.tenant.toString() === senderId) {

            receiverId = booking.owner;

        } else if (booking.owner.toString() === senderId) {

            receiverId = booking.tenant;

        } else {

            return {
                success: false,
                statusCode: 403,
                message: "Unauthorized",
            };

        }

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            booking: bookingId,
            message,
        });

        const populatedMessage = await Message.findById(newMessage._id)
            .populate("sender", "name email")
            .populate("receiver", "name email");

            const io = getIO();

            io.to(bookingId).emit("receive-message", populatedMessage);

        return {

            success: true,
            statusCode: 201,
            message: "Message sent successfully",

            data: newMessage,

        };

    } catch (error) {

        throw error;

    }

};

// ==============================
// Get Conversation
// ==============================
export const getConversationService = async (
    bookingId,
    userId
) => {

    try {

        const booking = await Booking.findById(bookingId);

        if (!booking) {

            return {
                success: false,
                statusCode: 404,
                message: "Booking not found",
            };

        }

        const allowedUsers = [

            booking.owner.toString(),
            booking.tenant.toString(),

        ];

        if (!allowedUsers.includes(userId)) {

            return {
                success: false,
                statusCode: 403,
                message: "Unauthorized",
            };

        }

        const messages = await Message.find({

            booking: bookingId,

        })
            .populate("sender", "name email")
            .populate("receiver", "name email")
            .sort({ createdAt: 1 });

        return {

            success: true,
            statusCode: 200,

            count: messages.length,

            messages,

        };

    } catch (error) {

        throw error;

    }

};