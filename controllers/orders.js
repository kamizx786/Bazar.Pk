import Order from "../models/Order";
import Product from "../models/product";
import Store from "../models/store";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const create = async (req, res) => {
  try {
    const { values } = req.body;
    const orderBy = req.auth._id;
    values.orderBy =orderBy;
    const order = await new Order(values).save();
    const { Products } = values;
    for (let i = 0; i < Products.length; i++) {
      const product = await Product.findById(Products[i].Product);
      const quantity = product.quantity;
      const updateQuantity = quantity - Products[i].order_quantity;
      const sold = product.totalSold;
      const updatedSold = sold + Products[i].order_quantity;
       const pro=await Product.findByIdAndUpdate(Products[i].Product,{quantity:updateQuantity
        ,totalSold:updatedSold
        },{
            new:true,
        })
    }
   
    return res.json({
      order
    });
  } catch (error) {
    return res.json({
      error: "Order Placement Failed",
    });
  }
};
export const createPurchase = async (req, res) => {
  try {
    const { values } = req.body;
    const orderBy = req.auth._id;
    values.orderBy =orderBy;
    const order = await new Order(values).save();
    return res.json({
      order
    });
  } catch (error) {
    return res.json({
      error: "Order Placement Failed",
    });
  }
};
export const update = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params._id,
     { orderStatus:status},
      {
      new:true
    }
    );
    return res.json({
      order
    });
  } catch (error) {
    return res.json({
      error: "Order Update Failed",
    });
  }
};
export const Stripecreate = async (req, res) => {
  try {
    const { values } = req.body;
    const store=await Store.findById(values.store).populate("user");
    const { Products } = values;
    let total = 0;
    for (let i = 0; i < Products.length; i++) {
      const product = await Product.findById(Products[i].Product);
      total += Products[i].order_quantity * product.salePrice;
    }
   const exchangeRate = 0.0035; // 1 PKR = 0.01 USD
   const totalInPKR = total; // Replace this with your actual total amount in PKR
   const totalInUSD = totalInPKR * exchangeRate;
   const fee=(totalInUSD*10)/100;
   const session=await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items:[
      {
        price_data: {
          currency: 'usd',
          unit_amount:Math.round(totalInUSD .toFixed(2)*100) ,
          product_data: {
            name: store.Storename,
            images: [store.main_pic.url],
          },
        },
        quantity:1,
      },
    ],
    payment_intent_data:{
      application_fee_amount:Math.round(fee.toFixed(2)*100),
      transfer_data:{
           destination:store.user.stripe_account_id
      }
    },
    mode: 'payment',
    success_url:'https://bazakr-pk-frontend.vercel.app/success',
    cancel_url:'https://bazakr-pk-frontend.vercel.app/cancel',
   });
  // //  return console.log("session",session);
    return res.json({
      sessionId:session.id
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Order Placement Failed",
    });
  }
};
export const orders = async (req, res) => {
    try {
      const orders = await Order.find({orderBy:req.auth._id})
        .sort({ createdAt: -1 })
        .populate("orderBy", "name")
        .populate("store","Storename")
        .populate("Products.Product");
    
      return res.json({
        orders,
      });
    } catch (error) {
      res.json({
        error: "Fetch Orders Failed",
      });
    }
  };
  export const Allorders = async (req, res) => {
    try {
      const orders = await Order.find({orderType:"Sales"})
        .sort({ createdAt: -1 })
        .populate("orderBy", "name")
        .populate("store","Storename")
        .populate("Products.Product");
    
      return res.json({
        orders,
      });
    } catch (error) {
      res.json({
        error: "Fetch Orders Failed",
      });
    }
  };
  export const Sellerorders = async (req, res) => {
    try {
      const shops = await Store.find({ user: req.auth._id });
      let  orders = [];
      for (let i = 0; i < shops.length; i++) {
        const shopOrders = await Order.find({ store: shops[i]._id })
        .sort({ createdAt: -1 })
        .populate("orderBy", "name")
        .populate("store","Storename")
        .populate("Products.Product");
        orders = [...orders, ...shopOrders];
      }
      return res.json({
        orders,
      });
    } catch (error) {
      res.json({
        error: "Fetch Orders Failed",
      });
    }
  };
