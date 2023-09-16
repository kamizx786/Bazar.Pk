import Contact from "../models/contact.model";
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
export const SendReply = async (req, res) => {
  try {
    const { values, message } = req.body;
    let mailOptions = {
      from: "Bazar.PK <kamranalizx491@gmail.com>",
      // sender address
      to: `${values.email}`, // list of receivers
      subject: `${values.subject}`, // Subject line
      html: `
            <h4>Help Desk Bazar.Pk</h4>
            <p>Hi,${values.name}</p>
            <p>Hi,${message}</p>
            `, // html body
    };
    SendEmail(mailOptions);
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Sending Email Problem",
    });
  }
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
      contacts,
    });
  } catch (error) {
    return res.json({
      error: "Fetch Contacts Failed",
    });
  }
};
export const DeleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    return res.json({
      ok: true,
    });
  } catch (error) {
    res.json({
      error: "Delete Contact Error",
    });
  }
};
