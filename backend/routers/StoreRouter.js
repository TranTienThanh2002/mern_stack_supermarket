import express from 'express';
import { createStore, deleteImageInCloudinary, deleteStore, getStore, updateStore } from '../controllers/StoreController.js';
import { isAuth } from '../controllers/UserController.js';

const StoreRouter = express.Router();
//create store
StoreRouter.post('/',isAuth, createStore);
//update store
StoreRouter.put('/updateStore/:id', updateStore);
//delete Store
StoreRouter.delete('/deleteStore/:id/:userId',isAuth, deleteStore);
//get store
StoreRouter.get('/getStore/:id', getStore);

StoreRouter.post('/deleteImage/:id', deleteImageInCloudinary);

export default StoreRouter;