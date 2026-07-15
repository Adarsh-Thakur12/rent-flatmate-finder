import {
    saveMessageService,
    getMessagesService,
} from "../services/chat.service.js";

// ======================
// Send Message
// ======================
export const sendMessage = async (req, res) => {

    try {

        const result = await saveMessageService(

            req.params.bookingId,

            req.user.id,

            req.body.message

        );

        return res
            .status(result.statusCode)
            .json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};

// ======================
// Get Messages
// ======================
export const getMessages = async (req, res) => {

    try {

        const result = await getMessagesService(

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

            message: "Internal Server Error",

        });

    }

};