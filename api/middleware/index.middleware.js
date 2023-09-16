import Store from "../models/store.model";
import User from "../models/user.model";
import { expressjwt } from "express-jwt";
const jwt = require("jsonwebtoken");

export const requireSigin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    if (user.role !== "Admin") {
      return res.json({
        error: "UnAuthorized Admin",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Admin Authentication Error");
    return res.json({
      error: "Admin Authentication Error",
    });
  }
};

export const isSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    if (user.role !== "Seller") {
      return res.json({
        error: "UnAuthorized ",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.json({
      error: "Seller Authentication Error",
    });
  }
};
export const EditDeleteStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params._id);
    if (store.user != req.auth._id) {
      return res.json({
        error: "You are Not allowed to Update and Delete Store",
      });
    } else {
      next();
    }
  } catch (error) {
    res.json({ error: "Unauthorized Error" });
  }
};
export const EditDeleteProduct = async (req, res, next) => {
  try {
    const { values } = req.body;
    const _id = values.store._id ? values.store._id : values.store;
    const store = await Store.findById(_id);
    if (store.user != req.auth._id) {
      return res.json({
        error: "You are Not allowed to Update and Delete Product",
      });
    } else {
      next();
    }
  } catch (error) {
    res.json({ error: "Unauthorized Error" });
  }
};
