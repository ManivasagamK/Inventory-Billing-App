import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pdf from 'html-pdf';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connect from './db/dbConnection.js';
import userRoutes from './routes/userRoutes.js';
import invoiceRoutes from './routes/invoices.js';
import clientRoutes from './routes/clients.js';
import profile from './routes/profile.js';
import pdfTemplate from './documents/index.js';
import emailTemplate from './documents/email.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Web Server Initialization
const app = express();
app.use(cors());
let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The App is running on the port ${PORT}!`);
  // connect to the database
  connect();
});

//dotenv file setup(environment variables)
dotenv.config();

// middlewares

app.use(express.json({ limit: '30mb', extended: true }));

app.use('/invoices', invoiceRoutes);
app.use('/clients', clientRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profile);

//Send invoice through nodemailer transport

var options = { format: 'A4' };
//SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', async (req, res) => {
  const { email, company } = req.body;

  try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mail = {
      from: `MKBillings <hello@mkbillings.com>`, // sender address
      to: `${email}`, // list of receivers
      replyTo: `${company.email}`,
      subject: `Invoice from ${
        company.businessName ? company.businessName : company.name
      }`, // Subject line
      text: `Invoice from ${
        company.businessName ? company.businessName : company.name
      }`, // plain text body
      html: emailTemplate(req.body), // html body
      attachments: [
        {
          filename: 'invoice.pdf',
          path: `${__dirname}/invoice.pdf`,
        },
      ],
    };
    transporter.sendMail(mail, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Mail has been sent', info.response);
        res.status(200).json({ message: 'Mail has been sent successfully' });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//CREATE PDF INVOICE
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
      if (err) {
        res.send(Promise.reject());
      } else {
        res.send(Promise.resolve());
      }
    });
  });
  
  //SEND PDF INVOICE
  app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/invoice.pdf`);
  });
  
  app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING');
  });

