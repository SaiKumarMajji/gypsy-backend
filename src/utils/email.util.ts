import nodemailer from "nodemailer";
import { Resend } from "resend";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) console.log("SMTP error:", error);
  else console.log("SMTP server ready");
});

const resend = new Resend(process.env.RESEND_API_KEY);
// export const sendEmail = async (to: string | string[], subject: string, html: string) => {
//   const mailOptions = {
//     from: `"Gypsy Wings" <${process.env.EMAIL_USER}>`,
//     to, 
//     subject,
//     html,
//   };

//   return transporter.sendMail(mailOptions);
// };

export const sendEmail = async (to: string[], subject: string, html: string) => {
  try {
    await resend.emails.send({
      from: "Gypsy Aviators <noreply@gypsyaviators.com>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("❌ Resend email failed:", error);
  }
};