// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   connectionTimeout: 30000, // Fail after 30s if no connection
//   socketTimeout: 30000,     // Fail after 30s if server stops responding
//   greetingTimeout: 30000,   // greeting timeout
//   tls: {
//     rejectUnauthorized: false // May help with certificate issues
//   }
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


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string[] | string, subject: string, html: string) => {
  try {
    const recipients = Array.isArray(to) ? to : [to];

    const results = await Promise.all(
      recipients.map((recipient) =>
        resend.emails.send({
          from: "Gypsy Aviators <onboarding@resend.dev>",
          to: recipient,
          subject,
          html,
        })
      )
    );

    console.log("✅ Emails sent:", results);
    return results;
  } catch (error) {
    console.error("❌ Resend email failed:", error);
  }
};
