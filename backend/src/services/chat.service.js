import Chat from "../models/Chat.js";
import Booking from "../models/Booking.js";

// ======================
// Save Message
// ======================
export const saveMessageService = async (
    bookingId,
    senderId,
    message
) => {

    try {

        const booking = await Booking.findById(
            bookingId
        );

        if (!booking) {

            return {
                success: false,
                statusCode: 404,
                message: "Booking not found",
            };

        }

        // Only owner or tenant can send messages
        if (

            booking.owner.toString() !== senderId &&

            booking.tenant.toString() !== senderId

        ) {

            return {
                success: false,
                statusCode: 403,
                message: "Unauthorized",
            };

        }

        // Chat allowed only after acceptance
        if (booking.status !== "Accepted") {

            return {
                success: false,
                statusCode: 400,
                message: "Chat is available only after booking acceptance",
            };

        }

        const chat = await Chat.create({

            booking: bookingId,

            sender: senderId,

            message,

        });
        await chat.populate(
            "sender",
            "name email"
        );
        
        return {

            success: true,

            statusCode: 201,

            chat,

        };

    } catch (error) {

        throw error;

    }

};

// ======================
// Get Chat History
// ======================
export const getMessagesService = async (
    bookingId,
    userId
) => {

    try {

        const booking = await Booking.findById(
            bookingId
        );

        if (!booking) {

            return {
                success: false,
                statusCode: 404,
                message: "Booking not found",
            };

        }

        if (

            booking.owner.toString() !== userId &&

            booking.tenant.toString() !== userId

        ) {

            return {
                success: false,
                statusCode: 403,
                message: "Unauthorized",
            };

        }

        const chats = await Chat.find({

            booking: bookingId,

        })

            .populate(
                "sender",
                "name email"
            )

            .sort({

                createdAt: 1,

            });

        return {

            success: true,

            statusCode: 200,

            chats,

        };

    } catch (error) {

        throw error;

    }

};