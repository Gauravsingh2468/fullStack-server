import nodemailer from "nodemailer";
import { Resend } from "resend";
import { EMAIL_USER, EMAIL_PASSWORD, RESEND_API_KEY } from "../config/env.js";

// Setup Nodemailer transporter if Gmail credentials are provided
const transporter = (EMAIL_USER && EMAIL_PASSWORD)
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    })
    : null;

// Setup Resend client if API key is provided
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const sendOTPEmail = async (email, otp) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #1e293b; text-align: center;">Email Verification</h2>
            <p style="color: #475569;">Thank you for registering.</p>
            <p style="color: #475569;">Your email verification OTP is:</p>
            <div style="text-align: center; margin: 24px 0;">
                <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #004aad; background: #eff6ff; padding: 12px 24px; border-radius: 6px;">${otp}</span>
            </div>
            <p style="color: #64748b; font-size: 14px;">This OTP expires in 2 minutes.</p>
            <p style="color: #94a3b8; font-size: 12px;">If you did not request this OTP, please ignore this email.</p>
        </div>
    `;

    // Prefer Nodemailer (Gmail) if configured, as it sends to any email address without domain restriction
    if (transporter) {
        try {
            const info = await transporter.sendMail({
                from: `"Full Stack App" <${EMAIL_USER}>`,
                to: email,
                subject: "Verify Your Email Address",
                html: htmlContent,
            });
            console.log(`[Email Service] OTP email sent successfully to ${email} (via Nodemailer)`);
            return { success: true, messageId: info.messageId };
        } catch (nodemailerError) {
            console.error("[Email Service] Nodemailer error:", nodemailerError);
            if (!resend) {
                throw new Error(nodemailerError.message || "Failed to send OTP email via Nodemailer");
            }
            console.log("[Email Service] Attempting fallback to Resend...");
        }
    }

    if (resend) {
        const { data, error } = await resend.emails.send({
            from: "Your App <onboarding@resend.dev>",
            to: [email],
            subject: "Verify Your Email Address",
            html: htmlContent,
        });

        if (error) {
            console.error("[Email Service] Resend error:", error);
            throw new Error(error.message || "Failed to send OTP email via Resend");
        }

        console.log(`[Email Service] OTP email sent successfully to ${email} (via Resend)`);
        return data;
    }

    throw new Error("No email service configured. Please provide EMAIL_USER & EMAIL_PASSWORD or RESEND_API_KEY.");
};
