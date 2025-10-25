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



import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string[], subject: string, html: string) => {
  try {
    const results = await Promise.allSettled(
      to.map((recipient) =>
        resend.emails.send({
          from: "Gypsy Aviators <onboarding@resend.dev>", 
          to: recipient,
          subject,
          html,
        })
      )
    );

    results.forEach((res, i) => {
      if (res.status === "fulfilled") {
        console.log(`✅ Email sent to ${to[i]}`);
      } else {
        console.error(`❌ Failed to send to ${to[i]}:`, res.reason);
      }
    });
  } catch (error) {
    console.error("❌ Resend bulk email failed:", error);
  }
};
