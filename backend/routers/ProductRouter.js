import express from "express";
import {
  createProduct,
  deleteImageInCloudinary,
  deleteProduct,
  fillTerAllProducts,
  fillTerAllProductsSortName,
  fillTerAllProductsSortPrice,
  fillTerProducts,
  fillTerProductsSortName,
  fillTerProductsSortPrice,
  get4ProductsTopSale,
  getAllProducts,
  getAllProductsInSearch,
  getAllProductsInSeller,
  getPageProducts,
  getPageProductsInSearch,
  getPageProductsInSeller,
  getPageProductsSearchInSeller,
  getProduct,
  getProductsTopSale,
  relateProduct,
  searchProduct,
  updateProduct,
} from "../controllers/ProductController.js";

const ProductRouter = express.Router();

//create
ProductRouter.post("/", createProduct);
//update
ProductRouter.put("/update/:id", updateProduct);

ProductRouter.post("/deleteImage/:id", deleteImageInCloudinary);
//delete
ProductRouter.delete("/delete/:id/:storeId", deleteProduct);
//get all products
ProductRouter.get("/", getAllProducts);
//get all products
ProductRouter.post("/getPageProducts", getPageProducts);
//get all products
ProductRouter.get("/limit/:limit", getAllProductsInSeller);

ProductRouter.get("/limitSearch/:limit/:key", getAllProductsInSearch);
//get all products in seller
ProductRouter.post("/seller", getPageProductsInSeller);
//get all products in seller
ProductRouter.post("/seller/search", getPageProductsSearchInSeller);
//get all products by key in search
ProductRouter.post("/searchByKey", getPageProductsInSearch);
//get product
ProductRouter.get("/:id", getProduct);
//search product
ProductRouter.get("/search/:key", searchProduct);
//filter products
ProductRouter.post("/filter/", fillTerProducts);
//filter all products
ProductRouter.post("/fillTerAllProducts/", fillTerAllProducts);



ProductRouter.post("/relateProduct/", relateProduct);

ProductRouter.post("/filter/name", fillTerProductsSortName);

ProductRouter.post("/filter/fillTerAllProductsSortName", fillTerAllProductsSortName);

ProductRouter.post("/filter/price", fillTerProductsSortPrice);

ProductRouter.post("/filter/fillTerAllProductsSortPrice", fillTerAllProductsSortPrice);
//get 4 products top sales
ProductRouter.get("/get/productTopSales", get4ProductsTopSale);
//get all products top sales
ProductRouter.get("/get/productTopSales/limit/:limit", getProductsTopSale);
export default ProductRouter;
