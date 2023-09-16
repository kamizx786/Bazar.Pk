import Category from "../models/category";
import slugify from "slugify";
export const create = async (req, res) => {
  try {
    const { values } = req.body;
    const slug = slugify(values.name);
    const category = await Category.findOne({ slug });
    if (category) return res.json({ error: "Category Already Exist" });
    values.slug = slug;
    const categories = await new Category(values).save();
    return res.json(categories);
  } catch (error) {
    
    return res.json({
      error: "Category Create Failed",
    });
  }
};
export const update = async (req, res) => {
  try {
    const { values } = req.body;
    const slug = slugify(values.name);
    values.slug = slug;
    const category = await Category.findOneAndUpdate(
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
      error: "Update Category Failed",
    });
  }
};
export const deletecategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({ slug: req.params.slug });
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      error: "Delete Failed",
    });
  }
};
export const AllCategories = async (req, res) => {
  try {
    const category = await Category.find().sort({ createdAt: -1 });
    return res.json({
      category,
    });
  } catch (error) {
    res.json({
      error: "Fetch Category Failed",
    });
  }
};
export const SingleCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (category) {
      return res.json({ category });
    } else {
      return res.json({
        error: "Not Found",
      });
    }
  } catch (error) {
    res.json({
      error: "Create Category Failed",
    });
  }
};
