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
    success_url:'https://bazar-pk-sellerside.vercel.app/success',
    cancel_url:'https://bazar-pk-sellerside.vercel.app/cancel',
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
// export const update = async (req, res) => {
//   try {
//     const { values } = req.body;
//     const slug = slugify(values.name);
//     values.slug = slug;
//     const product = await Product.findOneAndUpdate(
//       { slug: req.params.slug },
//       values,
//       {
//         new: true,
//       }
//     );
//     return res.json({
//       ok: true,
//     });
//   } catch (error) {
//     res.json({
//       error: "Update Product Failed",
//     });
//   }
// };
// export const deleteproduct = async (req, res) => {
//   try {
//     await Product.findOneAndDelete({ slug: req.params.slug });
//     return res.json({
//       ok: true,
//     });
//   } catch (error) {
//     return res.json({
//       error: "Delete Product Failed",
//     });
//   }
// };
// export const SellerProducts = async (req, res) => {
//   try {
//     const shops = await Store.find({ user: req.auth._id });
//     let products = [];
//     for (let i = 0; i < shops.length; i++) {
//       const shopProducts = await Product.find({ store: shops[i]._id })
//         .sort({ createdAt: -1 })
//         .populate("category", "name")
//         .populate("store", "Storename");
//       products = [...products, ...shopProducts];
//     }
//     return res.json({
//       products,
//     });
//   } catch (error) {
//     res.json({
//       error: "Fetch Products Failed",
//     });
//   }
// };

// // export const SingleCategory=async(req,res)=>{
// //     try{
// //         const category= await  Category.findOne({slug:req.params.slug});
// //         if(category){
// //            return res.json({category});
// //         }
// //         else{
// //            return res.json({
// //                 error:"Not Found"
// //             })
// //         }
// //     }
// //     catch(error){
// //         res.json({
// //             error:"Create Category Failed"
// //         });
// //     }
// // }
