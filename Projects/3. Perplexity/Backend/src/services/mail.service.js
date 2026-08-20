import nodemailer from "nodemailer";

const authConfig = process.env.GOOGLE_APP_PASSWORD
    ? {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
    : {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    };

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: authConfig
});

transporter.verify()
.then(() => { console.log("Email transporter is ready to send emails"); })
.catch((err) => { console.error("Email transporter verification failed: ", err) })

export const sendEmail = async ( { to, subject, html, text } ) => {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", details)
}