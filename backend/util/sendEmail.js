import { Resend } from 'resend';

async function sendVerificationEmail(to, subject, body) {
  // Initialize inside the function so process.env is guaranteed to be loaded
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log("Sending email via Resend API...");

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html: body,
    });

    if (response.error) {
      console.error("Resend API Error:", response.error);
      throw new Error(response.error.message);
    }

    console.log("Email sent successfully! ID:", response.data.id);
    return response.data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export default sendVerificationEmail;