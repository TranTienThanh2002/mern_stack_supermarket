import express  from "express";
import { createCart, getAllCart, getAllCartByKeySearch, getCartByEmail, getCartById, getOrderByUserEmail, getPageCart, getPageCartByEmail, updateStatus } from "../controllers/CartController.js";
import { isAuth } from "../controllers/UserController.js";

const CartRouter = express.Router();
//create Cart
CartRouter.post('/',isAuth, createCart);
//update status Cart 
CartRouter.put('/updateStatus/:id', updateStatus);
//get cart by Id
CartRouter.get(`/getCartById/:id`, getCartById);
//get cart by email
CartRouter.get(`/getCartByEmail/`, getCartByEmail);
//get all cart
CartRouter.get(`/getAllCart`,isAuth, getAllCart);
//get all cart
CartRouter.post(`/getPageCart`,isAuth, getPageCart);

CartRouter.post(`/getPageCartByEmail`, getPageCartByEmail);

CartRouter.post(`/getAllCartByKeySearch`, getAllCartByKeySearch);
//get all cart by user email
CartRouter.get(`/getAllCartByUser/:email`, getOrderByUserEmail);
export default CartRouter;