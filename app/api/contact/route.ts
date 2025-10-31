// app/api/contact/route.ts
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Build email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Message from ${name} - ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message:
${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
