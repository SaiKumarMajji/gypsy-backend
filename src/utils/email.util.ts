import nodemailer from "nodemailer";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string[], subject: string, html: string) => {
  try {
    await resend.emails.send({
      from: "Gypsy Aviators <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("❌ Resend email failed:", error);
  }
};