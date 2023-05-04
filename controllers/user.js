import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { comparepassword, hashpassword } from "../helpers/auth";
import User from "../models/user";
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
//Register Controller
export const Register = async (req, res) => {
  const { name, email, whatsapp, address, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "User Already Exist",
    });
  }
  const secret = nanoid(6);
  const hashedpassword = await hashpassword(password);
  const user = new User({
    name,
    email,
    whatsapp,
    address,
    password: hashedpassword,
    secret,
  });
  // Set up mail options
  let mailOptions = {
    from: "Bazar.PK <kamranalizx491@gmail.com>",
    // sender address
    to: `${email}`, // list of receivers
    subject: "Confirm Your Registeration", // Subject line
    text: "Please Confirm Your Registeration.If you do not Confirm Your Registration You cannot Login.Use This Code to Confirm your Regsitration.", // plain text body
    html: `
        <h4>PLease Confirm your Email</h4>
        <p>Please Confirm Your Registeration.If you do not Confirm Your Registration You cannot Login.Use This Code to Confirm your Regsitration.</p>
        <p>Go to This Link <b>http://localhost:3000/registerComplete</b></p>
        <b>${secret}</b>
        `, // html body
  };
  try {
    await user.save();
    SendEmail(mailOptions);
    return res.json({ ok: true });
  } catch (err) {
    console.log("Register Error", err);
    return res.json({
      error: "Register Error,Plase Try Again",
    });
  }
};
export const RegisterSeller = async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "User Already Exist",
    });
  }
  const secret = nanoid(6);
  const hashedpassword = await hashpassword(password);
  const role = "Seller";
  const user = new User({
    name,
    email,
    password: hashedpassword,
    secret,
    role,
  });
  // Set up mail options
  let mailOptions = {
    from: "Bazar.PK <kamranalizx491@gmail.com>",
    // sender address
    to: `${email}`, // list of receivers
    subject: "Confirm Your Registeration", // Subject line
    text: "Please Confirm Your Registeration.If you do not Confirm Your Registration You cannot Login.Use This Code to Confirm your Regsitration.", // plain text body
    html: `
        <h4>PLease Confirm your Email</h4>
        <p>Please Confirm Your Registeration.If you do not Confirm Your Registration You cannot Login.Use This Code to Confirm your Regsitration.</p>
        <p>Go to This Link <b>http://127.0.0.1:5173/register-complete</b></p>
        <b>${secret}</b>
        `, // html body
  };
  try {
    await user.save();
    SendEmail(mailOptions);
    return res.json({ ok: true });
  } catch (err) {
    console.log("Register Seller Error", err);
    return res.json({
      error: "Register Seller Error,Plase Try Again",
    });
  }
};
export const RegisterComplete = async (req, res) => {
  try {
    const { email, secret } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User doesn't  Exist",
      });
    }
    if (user.secret !== secret) {
      return res.json({
        error: "Wrong Confirmation Code",
      });
    } else {
      const Update = await User.findOneAndUpdate(
        { email },
        { status: "Confirmed", secret: "" },
        {
          new: true,
        }
      );
      res.json({ ok: true });
    }
  } catch (error) {
    console.log("error");
    res.json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User Not Found",
      });
    }
    const match = await comparepassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong Credential",
      });
    }
    if (user.status === "Not Confirmed") {
      return res.json({
        error: "Your Email Address is Not Verified Please Verify Your Email",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    return res.json({
      token,
      user,
    });
  } catch (err) {
    console.log("Login Error", err);
    return res.json({
      error: "Try Again",
    });
  }
};
export const Forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User Not Found",
      });
    }
    const secret = nanoid(8);
    await User.findByIdAndUpdate(user._id, { secret }).exec();
    // Set up mail options
    let mailOptions = {
      from: "Bazar.PK <kamranalizx491@gmail.com>",
      // sender address
      to: `${email}`, // list of receivers
      subject: "Reset Your Password", // Subject line
      text: `Reset Password`,
      html: `
        <h4>Below are the Details For Reset Password</h4>
        <p>here is The Code For Reset Password PLease Enter this Code and Set New Password</b></p>
        <b>Reset Password Code ${secret}</b>
        `, // html body
    };
    SendEmail(mailOptions);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("Forgot Error", err);
    return res.json({
      error: "Try Again",
    });
  }
};
export const forgotComplete = async (req, res) => {
  try {
    const { email, Newpassword, secret } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User Not Found",
      });
    }
    const match = await comparepassword(Newpassword, user.password);
    if (match) {
      return res.json({
        error: "You already Used This Password Please Try Different One",
      });
    }
    if (user.secret !== secret) {
      return res.json({
        error: "Wrong Code",
      });
    } else {
      const hashed = await hashpassword(Newpassword);
      await User.findByIdAndUpdate(user._id, {
        password: hashed,
        secret: "",
        status: "Confirmed",
      }).exec();
      return res.json({
        ok: true,
      });
    }
  } catch (err) {
    console.log("Forgot Error", err);
    return res.json({
      error: "Try Again",
    });
  }
};
export const GoogleSignup = async (req, res) => {
  const { name, email } = req.user;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User Already Exist Please Login",
      });
    } else {
      const newUser = await new User({
        name,
        email,
        status: "Confirmed",
      }).save();
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({
        token,
        newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "User Error",
    });
  }
};
export const GoogleSignin = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User Doesn't Exist Please Register",
      });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      user.password = undefined;
      user.secret = undefined;
      return res.json({
        token,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "User Error",
    });
  }
};
export const allusers = async (req, res) => {
  try {
    const user = await User.find();
    return res.json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: "User Error",
    });
  }
};
