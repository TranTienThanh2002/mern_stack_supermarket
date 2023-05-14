import express from 'express';
import { createAddress, deleteAddress, deleteAddressInUser, getAddress, getAddressByEmail, getAddressByUserId, updateAddress } from '../controllers/AddressController.js';


const AddressRouter = express.Router();
//create Address
AddressRouter.post('/', createAddress);
//update 
AddressRouter.put('/update/:id', updateAddress);
//delete
AddressRouter.delete('/delete/:id', deleteAddress);

AddressRouter.put('/deleteAddressInUser/:id', deleteAddressInUser);
//get address
AddressRouter.get('/gets/:id', getAddress);
//get address by usersId
AddressRouter.get('/getByUserId/:id',getAddressByUserId);
//get address by email
AddressRouter.get('/getByEmail/:email',getAddressByEmail);

export default AddressRouter;