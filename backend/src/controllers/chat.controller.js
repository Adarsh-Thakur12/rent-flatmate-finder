import {
    sendMessageService,
    getConversationService,
} from "../services/chat.service.js";

// ===================================
// Send Message
// ===================================
export const sendMessage = async (req, res) => {

    try {

        const result = await sendMessageService(
            req.user.id,
            req.params.bookingId,
            req.body.message
        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
        });

    }

};

// ===================================
// Get Conversation
// ===================================
export const getConversation = async (req, res) => {

    try {

        const result = await getConversationService(
            req.params.bookingId,
            req.user.id
        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
        });

    }

};
