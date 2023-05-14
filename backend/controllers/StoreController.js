import Store from "../models/Store.js";

import cloudinary from "cloudinary";
import dotenv from "dotenv";
import Users from "../models/Users.js";
dotenv.config();
cloudinary.v2.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});
//create Store
export const createStore = async (req, res, next) => {
  const newStore = new Store(req.body.info);
  const email = req.body.email;
  try {
    const store = await Store.find({ email });
    if (store.length > 0) {
      return res.status(401).json({ message: "Email Invalid" });
    }
    const saveStore = await newStore.save();
    await Users.findOneAndUpdate(
      { email: email },
      {
        $set: { store: saveStore._id },
      }
    );

    res.status(200).json(saveStore);
  } catch (error) {
    console.log("new store error: " + error);
    next(error);
  }
};
//update store
export const updateStore = async (req, res, next) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedStore);
  } catch (error) {
    next(error);
  }
};
//delete store
export const deleteStore = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.params.userId;
  try {
    await Store.findByIdAndDelete(id);
    await Users.findByIdAndUpdate(
      userId,
      {
        $set: { store: "" },
      },
      { new: true }
    );
    res.status(200).json("Delete successful");
  } catch (error) {
    next("delete store" + error);
  }
};

export const getStore = async (req, res, next) => {
  const id = req.params.id;
  try {
    const store = await Store.findById(id);
    res.status(200).json(store);
  } catch (error) {
    console.log("get store error: " + error);
    next("get store" + error);
  }
};

//delete Image in Cloudinary
export const deleteImageInCloudinary = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id);

    try {
      let public_id = store.photos.split("/").at(-1).split(".").at(0);
      public_id = "images/" + public_id;
      await cloudinary.v2.uploader.destroy(public_id, { invalidate: true });
      res.status(200).json("SUCCESS");
    } catch (error) {
      console.log(error);
      next("delete Image " + error.message);
    }
  } catch (error) {
    next(error);
  }
};
