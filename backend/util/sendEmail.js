import nodemailer from 'nodemailer'
async function sendVerificationEmail(to, subject, body) {
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

  console.log("Checking Gmail SMTP...");

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});


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