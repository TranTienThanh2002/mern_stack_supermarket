import Address from "../models/Address.js";
import users from "../models/Users.js";

export const createAddress = async (req, res, next) => {
  const newAddress = await Address(req.body.info);
  const userId = req.body.userId;
  try {
    const saveAddress = await newAddress.save();
    try {
      await users.findByIdAndUpdate(userId, {
        $push: { addressShipping: saveAddress._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveAddress);
  } catch (error) {
    next(error);
  }
};
export const deleteAddressInUser = async(req, res, next) => {
  const id = req.params.id;
  const userId = req.body.userId;
  try {
    await users.findByIdAndUpdate(
      userId,
      {
        $pull: { addressShipping: id },
      },
      { new: true }
    );
    res.status(200).json("Delete successful");
  } catch (error) {
    next("delete address" + error);
  }
}
export const deleteAddress = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Address.findByIdAndDelete(id);
    
    res.status(200).json("Delete successful");
  } catch (error) {
    next("delete address" + error);
  }
};

export const getAddress = async (req, res, next) => {
  const id = req.params.id;
  try {
    const address = await Address.findById(id);
    res.status(200).json(address);
  } catch (error) {
    next("get address" + error);
  }
};
export const getAddressByUserId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await users.findOne({ _id: id });

    const listAddress = await Promise.all(
      user.addressShipping.map((id) => {
        return Address.findById(id);
      })
    );

    res.status(200).json(listAddress);
  } catch (error) {
    next("get address by userId" + error);
  }
};
export const getAddressByEmail = async (req, res, next) => {
  const email = req.params.email;
  try {
    const user = await users.findOne({ email: email });

    const listAddress = await Promise.all(
      user.addressShipping.map((id) => {
        return Address.findById(id);
      })
    );

    res.status(200).json(listAddress);
  } catch (error) {
    next("get address by userId" + error);
  }
};

export const updateAddress = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updateAddress = await Address.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateAddress);
  } catch (error) {
    next("update address" + error);
  }
};
