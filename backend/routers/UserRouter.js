import express from "express";
import {
  GetAllUsers,
  GetUser,
  ResetPassword,
  UpdateUser,
  Verify,
  changePassword,
  createUser,
  createUserWithGG,
  deleteImageInCloudinary,
  isAuth,
  login,
  refreshToken,
  resetPassword,
} from "../controllers/UserController.js";

const UserRouter = express.Router();
//createUser
UserRouter.post("/", createUser);
//createUser by register with gg
UserRouter.post("/createUserWithGG", createUserWithGG);
//update
UserRouter.put("/update/:id", UpdateUser);
//deleteUser
UserRouter.delete("/delete/:id", );

UserRouter.post('/deleteImage/:id', deleteImageInCloudinary);;
//get All User
UserRouter.get("/",isAuth, GetAllUsers);
//get User
UserRouter.get("/get/:email",isAuth, GetUser);
//get User when forgot password
UserRouter.get("/gets/:email", GetUser);
//User login 
UserRouter.post("/login", login);
// // refreshToken
// UserRouter.post("/refreshToken", refreshToken);
//logout
UserRouter.get("/logout", refreshToken);
//changePassWord
UserRouter.put('/changePassWord/:id', changePassword);
//resetPassWord
UserRouter.put('/resetPassWord/:id', ResetPassword);
//verify
UserRouter.get("/verify/:email", Verify);
//reset
UserRouter.get('/reset/:email', resetPassword)
export default UserRouter;
