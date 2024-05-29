import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function POST(req: NextRequest) {
    try {
        const { text, email } = await req.json();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVE_EMAIL_USER,
            subject: "New comment received",
            text: `From: ${email}\n\n${text}`,
        }
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Comment submitted and email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}