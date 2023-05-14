import products from "../models/Products.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import Store from "../models/Store.js";
import Comment from "../models/Comment.js";
dotenv.config();
cloudinary.v2.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

//create Product
export const createProduct = async (req, res, next) => {
  const { storeId, ...other } = req.body;
  const newProduct = new products(other);
  try {
    const savedProduct = await newProduct.save();
    await Store.findByIdAndUpdate(
      storeId,
      {
        $push: { product: savedProduct._id },
      },
      {
        new: true,
      }
    );
    res.status(200).json(savedProduct);
  } catch (error) {
    next(error);
  }
};
//delete Image in Cloudinary
export const deleteImageInCloudinary = async (req, res, next) => {
  try {
    const product = await products.findById(req.params.id);

    if (product.photos.length > 0) {
      try {
        await Promise.all(
          product.photos.map(async (photo) => {
            let public_id = photo.split("/").at(-1).split(".").at(0);
            public_id = "images/" + public_id;
            await cloudinary.v2.uploader.destroy(public_id, {
              invalidate: true,
            });
          })
        );

        res.status(200).json("SUCCESS");
      } catch (error) {
        console.log(error);
        next("delete Image " + error.message);
      }
    }
  } catch (error) {
    next(error);
  }
};
//update Product
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
//delete Products
export const deleteProduct = async (req, res, next) => {
  try {
    await products.findByIdAndDelete(req.params.id);
    await Store.findByIdAndUpdate(
      req.params.storeId,
      {
        $pull: { product: req.params.id },
      },
      {
        new: true,
      }
    );
    res.status(200).json("Delete success");
  } catch (error) {
    next(error);
  }
};
//get product
export const getProduct = async (req, res, next) => {
  try {
    const product = await products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
//get all products
export const getAllProducts = async (req, res, next) => {
  const { priceMin, priceMax, ...others } = req.query;
  try {
    const getAllProducts = await products.find({
      ...others,
      price: {
        $gt: priceMin | 0,
        $lt: priceMax | 100000,
      },
    }).sort({ _id: -1 });
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
export const getPageProducts = async (req, res, next) => {
  const { priceMin, priceMax, ...others } = req.query;
  let { page, limit } = req.body;
  try {
    const getAllProducts = await products
      .find({
        ...others,
        price: {
          $gt: priceMin | 0,
          $lt: priceMax | 100000,
        },
      })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
//get 4 products top sale
export const get4ProductsTopSale = async (req, res, next) => {
  const { ...others } = req.query;
  try {
    const getAllProducts = await products
      .find({
        ...others,
      })
      .sort({ sales: -1 })
      .limit(4);
    res.status(200).json(getAllProducts);
  } catch (error) {
    console.log("get 4 top sale  error: " + error);
    next(error);
  }
};
export const getProductsTopSale = async (req, res, next) => {
  const { ...others } = req.query;
  const limit = req.params.limit;
  try {
    const getAllProducts = await products
      .find({
        ...others,
      })
      .sort({ sales: -1 })
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    console.log("get  top sale  error: " + error);
    next(error);
  }
};
//get all products in admin
export const getPageProductsInSeller = async (req, res, next) => {
  let { page, limit, key } = req.body;
  try {
    const getAllProducts = await products
      .find({
        productname: { $regex: `/*${key}/*`, $options: "i" },
      })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
// in admin
export const getPageProductsSearchInSeller = async (req, res, next) => {
  let { limit, key } = req.body;
  try {
    const getAllProducts = await products
      .find({
        productname: { $regex: `/*${key}/*`, $options: "i" },
      })
      .sort({ _id: -1 })
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};

export const getAllProductsInSeller = async (req, res, next) => {
  const { ...others } = req.query;
  const limit = req.params.limit;
  try {
    const getAllProducts = await products
      .find({
        ...others,
      })
      .sort({ _id: -1 })
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};

export const fillTerProducts = async (req, res, next) => {
  // const { priceMin, priceMax, ...others } = req.body;
  let { tags, startPrice, endPrice, page, limit } = req.body;
  if (tags.length === 0) {
    tags = ["vegetable", "cake", "beverage", "meats","breakfast", "frozen","snacks","grocery","wines","milk","pets"];
  }

  try {
    const getAllProducts = await products
      .find({
        tags: { $in: tags },
        price: {
          $gt: startPrice | 0,
          $lt: endPrice | 100000,
        },
      })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
export const fillTerAllProducts = async (req, res, next) => {
  // const { priceMin, priceMax, ...others } = req.body;
  let { tags, startPrice, endPrice, page, limit } = req.body;
  if (tags.length === 0) {
    tags = ["vegetable", "cake", "beverage", "meats","breakfast", "frozen","snacks","grocery","wines","milk","pets"];
  }

  try {
    const getAllProducts = await products
      .find({
        tags: { $in: tags },
        price: {
          $gt: startPrice | 0,
          $lt: endPrice | 100000,
        },
      })
      .sort({ _id: -1 })
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
export const fillTerProductsSortName = async (req, res, next) => {
  // const { priceMin, priceMax, ...others } = req.body;
  let { tags, startPrice, endPrice, page, limit, sortBy } = req.body;
  if (tags.length === 0) {
    tags = ["vegetable", "cake", "beverage", "meats","breakfast", "frozen","snacks","grocery","wines","milk","pets"];
  }
  let value = sortBy.sortBy["sort"];
  try {
    const getAllProducts = await products
      .find({
        tags: { $in: tags },
        price: {
          $gt: startPrice | 0,
          $lt: endPrice | 100000,
        },
      })
      .sort({ productname: value })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
export const fillTerAllProductsSortName = async (req, res, next) => {
  // const { priceMin, priceMax, ...others } = req.body;
  let { tags, startPrice, endPrice, page, limit, sortBy } = req.body;
  if (tags.length === 0) {
    tags = ["vegetable", "cake", "beverage", "meats","breakfast", "frozen","snacks","grocery","wines","milk","pets"];
  }
  let value = sortBy.sortBy["sort"];
  try {
    const getAllProducts = await products
      .find({
        tags: { $in: tags },
        price: {
          $gt: startPrice | 0,
          $lt: endPrice | 100000,
        },
      })
      .sort({ productname: value })
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
export const fillTerProductsSortPrice = async (req, res, next) => {
  // const { priceMin, priceMax, ...others } = req.body;
  let { tags, startPrice, endPrice, page, limit, sortBy } = req.body;
  if (tags.length === 0) {
    tags = ["vegetable", "cake", "beverage", "meats","breakfast", "frozen","snacks","grocery","wines","milk","pets"];
  }
  let value = sortBy.sortBy["sort"];
  try {
    const getAllProducts = await products
      .find({
        tags: { $in: tags },
        price: {
          $gt: startPrice | 0,
          $lt: endPrice | 100000,
        },
      })
      .sort({ price: value })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
export const fillTerAllProductsSortPrice = async (req, res, next) => {
  // const { priceMin, priceMax, ...others } = req.body;
  let { tags, startPrice, endPrice, page, limit, sortBy } = req.body;
  if (tags.length === 0) {
    tags = ["vegetable", "cake", "beverage", "meats","breakfast", "frozen","snacks","grocery","wines","milk","pets"];
  }
  let value = sortBy.sortBy["sort"];
  try {
    const getAllProducts = await products
      .find({
        tags: { $in: tags },
        price: {
          $gt: startPrice | 0,
          $lt: endPrice | 100000,
        },
      })
      .sort({ price: value })
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};

//search
export const searchProduct = async (req, res, next) => {
  const key = req.params.key;
  // const limit = (req.params.limit);
  try {
    const product = await products.find({
      productname: { $regex: `/*${key}/*`, $options: "i" },
    });
    res.status(200).json(product);
  } catch (error) {
    console.log("search product" + error);
    next(error);
  }
};
export const getAllProductsInSearch = async (req, res, next) => {
  const key = req.params.key;
  const limit = req.params.limit;
  try {
    const getAllProducts = await products
      .find({
        productname: { $regex: `/*${key}/*`, $options: "i" },
      })
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};
export const getPageProductsInSearch = async (req, res, next) => {
  let { page, limit, key } = req.body;
  try {
    const getAllProducts = await products
      .find({
        productname: { $regex: `/*${key}/*`, $options: "i" },
      })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};

//get relateProduct
export const relateProduct = async (req, res, next) => {
  // const { priceMin, priceMax, ...others } = req.body;
  let { tags } = req.body;
  if (tags.length === 0) {
    tags = ["vegetable", "cake", "beverage", "meats","breakfast", "frozen","snacks","grocery","wines","milk","pets"];
  }

  try {
    const getAllProducts = await products
      .find({
        tags: { $in: tags },
      })
      .sort({ _id: -1 })

      .limit(20);
    res.status(200).json(getAllProducts);
  } catch (error) {
    console.log("relating product error: ", error)
    next(error);
  }
};
