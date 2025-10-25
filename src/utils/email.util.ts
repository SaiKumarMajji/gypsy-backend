// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   connectionTimeout: 30000, // Fail after 30s if no connection
//   socketTimeout: 30000,     // Fail after 30s if server stops responding
// });

// transporter.verify((error, success) => {
//   if (error) console.log("SMTP error:", error);
//   else console.log("SMTP server ready");
// });

// export const sendEmail = async (to: string | string[], subject: string, html: string) => {
//   const mailOptions = {
//     from: `"Gypsy Wings" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   };

//   return transporter.sendMail(mailOptions);
// };

import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendEmail = async (to: string[], subject: string, html: string) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY!; // your Brevo API key

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = { name: "Gypsy Aviators", email: process.env.BREVO_SENDER_EMAIL }; 

    const recipients = to.map((email) => ({ email }));

    const sendSmtpEmail = {
      sender,
      to: recipients,
      subject,
      htmlContent: html,
    };

    const response = await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Brevo email sent:", response.messageId);
  } catch (error) {
    console.error("❌ Brevo email failed:", error);
  }
};
