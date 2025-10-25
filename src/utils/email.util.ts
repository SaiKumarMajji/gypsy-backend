import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000, // Fail after 30s if no connection
  socketTimeout: 30000,     // Fail after 30s if server stops responding
});

transporter.verify((error, success) => {
  if (error) console.log("SMTP error:", error);
  else console.log("SMTP server ready");
});

export const sendEmail = async (to: string | string[], subject: string, html: string) => {
  const mailOptions = {
    from: `"Gypsy Wings" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

