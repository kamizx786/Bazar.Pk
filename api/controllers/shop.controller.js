import Store from "../models/store.model";
import slugify from "slugify";
const nodemailer = require("nodemailer");
export const create = async (req, res) => {
  try {
    const { values } = req.body;

    const slug = slugify(values.Storename);
    const store = await Store.findOne({ slug });
    if (store) return res.json({ error: "Store Already Exist" });
    values.slug = slug;
    values.user = req.auth._id;
    const data = await new Store(values).save();
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Create Store Failed",
    });
  }
};
export const update = async (req, res) => {
  try {
    const { values } = req.body;
    const slug = slugify(values.Storename);
    values.slug = slug;
    const store = await Store.findByIdAndUpdate(
      { _id: req.params._id },
      values,
      {
        new: true,
      }
    );
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Update Store Failed",
    });
  }
};
export const Delete = async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params._id);
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Delete Store Failed",
    });
  }
};
export const AllShops = async (req, res) => {
  try {
    const shops = await Store.find()
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("user", "name email _id");
    return res.json({
      shops,
    });
  } catch (error) {
    res.json({
      error: "Fetch Store Failed",
    });
  }
};
export const Shops = async (req, res) => {
  try {
    const shops = await Store.find({ status: "Active" })
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("user", "name email _id");
    return res.json({
      shops,
    });
  } catch (error) {
    res.json({
      error: "Fetch Store Failed",
    });
  }
};
export const SellerShops = async (req, res) => {
  try {
    const shops = await Store.find({ user: req.auth._id })
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("user", "name email _id");
    return res.json({
      shops,
    });
  } catch (error) {
    res.json({
      error: "Fetch Store Failed",
    });
  }
};
const SendEmail = (mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "farisirfanbit19.03@gmail.com",
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
export const ApproveShop = async (req, res) => {
  const status = "Active";
  const storebyUser = await Store.findById(req.params._id).populate("user");
  const store = await Store.findByIdAndUpdate(
    { _id: req.params._id },
    { status },
    {
      new: true,
    }
  );
  // Set up mail options
  let mailOptions = {
    from: "Bazar.PK <farisirfanbit19.03@gmail.com>",
    // sender address
    to: `${storebyUser.user.email}`, // list of receivers
    subject: `${storebyUser.Storename} is live`, // Subject line
    html: `
   <p>Congratulations You Shop is Now Live You Can Add Products Now</p>
   <p>Your Shop Url is :<b>https://bazakr-pk-frontend.vercel.app/shop/${storebyUser.slug}</b></p>
   `, // html body
  };
  try {
    SendEmail(mailOptions);
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Update Store Failed",
    });
  }
};
export const DisApproveShop = async (req, res) => {
  try {
    const status = "InActive";
    const store = await Store.findByIdAndUpdate(
      { _id: req.params._id },
      { status },
      {
        new: true,
      }
    );
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Update Store Failed",
    });
  }
};


// Controller function to find stores within a 5 km radius
export const findStoresWithinRadius = async (req, res) => {
  try {
    const { longitude, latitude } = req.query; // Get longitude and latitude from request query parameters
    
    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Please provide both longitude and latitude.' });
    }

    // Define the coordinates as a point
    const userCoordinates = {
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    };

    // Find stores within a 5 km radius using $geoWithin
    const stores = await Store.find({
      location: {
        $geoWithin: {
          $centerSphere: [[userCoordinates.longitude, userCoordinates.latitude], 5 / 6371], // 5 km radius (6371 is the Earth's radius in km)
        },
      },
    });

    res.status(200).json({ stores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
