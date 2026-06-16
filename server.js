import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ermiasdegu42@gmail.com",
    pass: "nbwlmwlfricslbvb"
  }
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  
  transporter.sendMail({
    from: "ermiasdegu42@gmail.com",
    to: "ermiasdegu42@gmail.com",
    subject: `Portfolio message from ${name}`,
    text: `Email: ${email}\n\nMessage: ${message}`
  });

  res.json({ success: true, reply: "Thanks! I will get back to you soon." });
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});