import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📩 Email sent to:", to);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};
