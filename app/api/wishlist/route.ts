// app/api/wishlist/route.ts
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { items, customerName, customerEmail, customerPhone } = await req.json();

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

    // Validate required data
    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No items in wishlist" 
        }), 
        { status: 400 }
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

    // Format items list
    const itemsList = items
      .map((item: any, index: number) => `${index + 1}. ${item.name}${item.subtitle ? ` - ${item.subtitle}` : ''}`)
      .join('\n');

    // Build email - hardcode recipient to nealy.eventdecor@gmail.com
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "nealy.eventdecor@gmail.com",
      replyTo: customerEmail || undefined,
      subject: `New Wishlist Inquiry${customerName ? ` from ${customerName}` : ''}`,
      text: `
New wishlist inquiry from Nealy Event Decor website:

${customerName ? `Customer Name: ${customerName}` : ''}
${customerEmail ? `Customer Email: ${customerEmail}` : ''}
${customerPhone ? `Customer Phone: ${customerPhone}` : ''}

Wishlist Items (${items.length} item${items.length === 1 ? '' : 's'}):
${itemsList}

Please contact the customer regarding availability and pricing.
      `,
      html: `
        <h2>New Wishlist Inquiry</h2>
        ${customerName ? `<p><strong>Customer Name:</strong> ${customerName}</p>` : ''}
        ${customerEmail ? `<p><strong>Customer Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>` : ''}
        ${customerPhone ? `<p><strong>Customer Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>` : ''}
        <hr>
        <p><strong>Wishlist Items (${items.length} item${items.length === 1 ? '' : 's'}):</strong></p>
        <ol>
          ${items.map((item: any) => `<li>${item.name}${item.subtitle ? ` - ${item.subtitle}` : ''}</li>`).join('\n')}
        </ol>
        <p>Please contact the customer regarding availability and pricing.</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Wishlist email sent successfully:", info.messageId);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Wishlist email send error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send email. Please try again later." 
      }), 
      { status: 500 }
    );
  }
}

