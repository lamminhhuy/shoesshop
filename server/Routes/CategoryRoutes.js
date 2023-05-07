import express from "express";
import asyncHandler from "express-async-handler";
import Category from "./../Models/Category.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";
const categoryRoutes = express.Router();
const productRoute=  express.Router();
// GET ALL PRODUCT
categoryRoutes.get(
    "/",
    asyncHandler(async (req, res) => {
   
      const categories = await Category.find({})
      res.json({ categories});
    })
  );
categoryRoutes.post(
    "/create",  
    asyncHandler(async (req, res) => {
      const { name, description } = req.body;
      const categoryExist = await Category.findOne({ name });
      if (categoryExist) {
        res.status(400);
        throw new Error("Category name already exist");
      } else {
        const category = new Category({
          name,
          description,    
        });
        if ( category) {
          const createdcategory = await category.save();
          res.status(201).json(createdcategory);
        } else {
          res.status(400);
          throw new Error("Invalid product data");
        }
      }
    })
  );
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 9;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
      
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// DELETE PRODUCT
categoryRoutes.delete(
  "/:id",
 
  asyncHandler(async (req, res) => {
    
    const product = await Category.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Category deleted" });
    } else {
      res.status(404);
      throw new Error("Category not Found");
    }
  })
);
// CREATE CATEGORY
productRoute.get(
  "/gethotsale/get",  
 
  asyncHandler(async (req, res) => {

    const products = await Product.find({HotSale:1}).sort({ _id: -1 });
    res.json(products);
  })
);
// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

productRoute.put(
  "/addhotsale/:id",

  asyncHandler(async (req, res) => {
    const { HotSale } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.HotSale = 1;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
productRoute.delete(
  "/deletehotsale/:id",

  asyncHandler(async (req, res) => {
   
    const product = await Product.findById(req.params.id);
    if (product) {
      product.HotSale = 0;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);


export default categoryRoutes;
