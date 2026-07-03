import transporter from "../config/mail.js";

export const sendMail = async (
    to,
    subject,
    html
) => {

    try {

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });

    } catch (error) {

        console.error("Mail Error:", error);

    }

};