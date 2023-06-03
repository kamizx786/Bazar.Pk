import Product from "../models/product";
import Store from "../models/store";
import slugify from "slugify";
export const create = async (req, res) => {
  try {
    const { values } = req.body;
    const slug = slugify(values.name);
    const product = await Product.findOne({ slug });
    if (product) return res.json({ error: "Product Already Exist" });
    values.slug = slug;
    const products = await new Product(values).save();
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Product Create Failed",
    });
  }
};
export const update = async (req, res) => {
  try {
    const { values } = req.body;
    const slug = slugify(values.name);
    values.slug = slug;
    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      values,
      {
        new: true,
      }
    );
    return res.json({
      ok: true,
    });
  } catch (error) {
    res.json({
      error: "Update Product Failed",
    });
  }
};
export const deleteproduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ slug: req.params.slug });
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Delete Product Failed",
    });
  }
};
export const SellerProducts = async (req, res) => {
  try {
    const shops = await Store.find({ user: req.auth._id });
    let products = [];
    for (let i = 0; i < shops.length; i++) {
      const shopProducts = await Product.find({ store: shops[i]._id })
        .sort({ createdAt: -1 })
        .populate("category", "name")
        .populate("store", "Storename");
      products = [...products, ...shopProducts];
    }
    return res.json({
      products,
    });
  } catch (error) {
    res.json({
      error: "Fetch Products Failed",
    });
  }
};
export const AllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("rating.postedBy","name")
      .populate("store");
    return res.json({
      products,
    });
  } catch (error) {
    res.json({
      error: "Fetch Products Failed",
    });
  }
};
export const ProductRating = async (req, res) => {
  try {
    const { star,review } = req.body;
    const product = await Product.findOne({slug:req.params.slug});
    const ExistRatings = product.rating.find((r) => {
      return r.postedBy.toString() === req.auth._id.toString();
    });

    if (ExistRatings) {
      const RatingsUpdated = await Product.updateOne(
        { rating: { $elemMatch: ExistRatings } },
        {
          $set: { "rating.$.star": star, "rating.$.review": review }
        },
        { new: true }
      );      
      res.json({RatingsUpdated});
    } else {
      const RatingsAdded = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { rating: { postedBy:req.auth._id, star,review } },
        },
        { new: true }
      );
      res.json({RatingsAdded});
    }
  } catch (error) {
    res.json({
      error: "Adding Rating Error",
    });
  }
};