import Contact from "../models/contact"
const nodemailer = require("nodemailer");
//Send Registration Email
const SendEmail = (mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "kamranalizx491@gmail.com",
      pass: process.env.PASS,
    },
  });
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email Sending Error", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
export const create = async (req, res) => {
  try {
    const { values } = req.body;
    const contact = await new Contact(values).save();
    let mailOptions = {
        from: "Bazar.PK <kamranalizx491@gmail.com>",
        // sender address
        to: `${values.email}`, // list of receivers
        subject: `${values.subject}`, // Subject line
        html: `
            <h4>Auto Reply From Bazar.Pk</h4>
            <p>Hi,${values.name}We Have Received your Message Our Team Will Contact with Your Shortly</p>
            `, // html body
      };
      SendEmail(mailOptions);
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Something Went Wrong",
    });
  }
};
export const ContactList = async (req, res) => {
    try {
      const { values } = req.body;
      const contacts = await Contact.find();
      return res.json({
        contacts
      });
    } catch (error) {
      return res.json({
        error: "Fetch Contacts Failed",
      });
    }
  };
  