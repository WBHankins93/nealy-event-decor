// app/api/contact/route.ts
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Validate required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing: EMAIL_USER or EMAIL_PASS not set");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service not configured. Please contact the administrator." 
        }), 
        { status: 500 }
      );
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Build email - hardcode recipient to nealy.eventdecor@gmail.com
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "nealy.eventdecor@gmail.com",
      replyTo: email, // Allow reply directly to the sender
      subject: `New Contact Form Message: ${subject}`,
      text: `
New message from Nealy Event Decor contact form:

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send email. Please try again later." 
      }), 
      { status: 500 }
    );
  }
}
