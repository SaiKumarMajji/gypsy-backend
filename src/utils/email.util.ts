// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
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



import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string | string[], subject: string, html: string) => {
  try {
    // Convert to array if it's a single string
    const recipients = Array.isArray(to) ? to : [to];
    
    const { data, error } = await resend.emails.send({
      from: 'Gypsy Wings <onboarding@resend.dev>', // Update with your verified domain
      to: recipients, // This can be an array of emails
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    console.log(`Email sent successfully to ${recipients.length} recipients:`, data?.id);
    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};