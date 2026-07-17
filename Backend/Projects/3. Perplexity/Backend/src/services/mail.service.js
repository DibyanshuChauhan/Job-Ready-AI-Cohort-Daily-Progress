import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify transporter when server starts
(async () => {
  try {
    await transporter.verify();
    console.log("✅ Gmail transporter is ready.");
  } catch (err) {
    console.error("❌ Gmail transporter verification failed");
    console.error("Message:", err.message);

    if (err.code) {
      console.error("Code:", err.code);
    }

    if (err.response) {
      console.error("Response:", err.response);
    }

    console.error(err);
  }
})();

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Perplexity AI" <${process.env.GOOGLE_USER}>`,
      to,
      subject,
      html,
      text,
    });

    console.log("==================================");
    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("==================================");

    return info;
  } catch (err) {
    console.error("==================================");
    console.error("❌ EMAIL SEND FAILED");
    console.error("Message:", err.message);

    if (err.code) {
      console.error("Code:", err.code);
    }

    if (err.command) {
      console.error("Command:", err.command);
    }

    if (err.response) {
      console.error("Response:", err.response);
    }

    console.error(err);
    console.error("==================================");

    throw err;
  }
};
