import nodemailer from 'nodemailer'
async function sendVerificationEmail(to, subject, body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  console.log("Checking Gmail SMTP...");

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
}
export default sendVerificationEmail