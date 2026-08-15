import nodemailer from 'nodemailer'
async function sendVerificationEmail(to,subject,body){
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })
    console.log(process.env.PASSWORD)
    console.log(process.env.EMAIL)
    const mailOptions={
        from:process.env.EMAIL,
        to,
        subject,
        html:body
    }
    await transporter.sendMail(mailOptions)
}
export default sendVerificationEmail