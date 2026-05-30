// Requires: npm install nodemailer
// Requires: npm install -D @types/nodemailer
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, service, message } = body

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email and message are required.' })
  }

  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: 587,
    secure: false,
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
  })

  await transporter.sendMail({
    from: `"${name}" <${config.mailUser}>`,
    to: config.mailUser,
    replyTo: email,
    subject: `New enquiry${service ? ` — ${service}` : ''} from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service || 'Not specified'}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  })

  return { success: true, message: 'Message sent successfully.' }
})
