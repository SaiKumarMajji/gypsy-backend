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


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.BREVO_SMTP_USER, // Your Brevo SMTP username
    pass: process.env.BREVO_SMTP_KEY,  // Your Brevo SMTP password
  },
  connectionTimeout: 10000,
  socketTimeout: 30000,
});

// Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("Brevo SMTP connection error:", error);
  } else {
    console.log("Brevo SMTP server is ready to take messages");
  }
});

export const sendEmail = async (to: string | string[], subject: string, html: string) => {
  const recipients = Array.isArray(to) ? to.join(', ') : to;
  
  const mailOptions = {
    from: `"Gypsy Wings" <${process.env.BREVO_SENDER_EMAIL}>`,
    to: recipients,
    subject,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${Array.isArray(to) ? to.length : 1} recipients`);
    return result;
  } catch (error) {
    console.error('Brevo email sending failed:', error);
    throw error;
  }
};