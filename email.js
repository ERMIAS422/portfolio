import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ermiasdegu42@gmail.com",
    pass: "nbwl mwlf rics lbvb"
  }
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  
  transporter.sendMail({
    from: email,
    to: "ermiasdegu42@gmail.com",
    subject: `Message from ${name}`,
    text: message
  });
});