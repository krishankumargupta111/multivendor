import nodemailer from 'nodemailer';
import dns from 'dns';

// Force IPv4 first to avoid IPv6 Gmail timeout issues
dns.setDefaultResultOrder('ipv4first');

async function sendVerificationEmail(to, subject, body) {
  console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD exists:", !!process.env.PASSWORD);
console.log("PASSWORD length:", process.env.PASSWORD?.length);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use true for port 465, false for port 587
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  console.log("Checking Gmail SMTP...");

  try {
    await transporter.verify();
    console.log("Gmail SMTP connection successful");

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html: body,
    };

    console.log("Sending email...");

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("SMTP Error:", error);
    throw error;
  }
}

export default sendVerificationEmail;