import users from "../models/Users.js";
import bcrypt from "bcrypt";
import { decodeToken, generateToken } from "../variables/auth.js";
import randToken from "rand-token";
// import { LocalStorage } from "node-localstorage";
import { sendMail } from "../utils/mailer.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.v2.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});
// const localStorage = new LocalStorage("./local-storage");
const saltRounds = 10;
export const refreshToken = async (req, res, next) => {
  try {
    const accessTokenFromHeader = req.headers.x_authorization.split(" ")[1];
    if (!accessTokenFromHeader) {
      return res.status(400).send("accessToken not found");
    }
    // const refreshTokenFromBody = req.body.refreshToken;
    // if (!refreshTokenFromBody) {
    //   return res.status(400).send("refreshToken not found");
    // }

    const decoded = await decodeToken(
      accessTokenFromHeader,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!decoded) {
      return res.status(400).send("Access token Invalid");
    }

    const user = await users.findOne({ _id: decoded.payload.id });
    if (user.length < 1) {
      return res.status(401).send("User not found");
    }
    // if (refreshTokenFromBody !== user.refreshToken) {
    //   return res.status(400).send("Refresh token not match.");
    // }
    const dataForAccessToken = {
      id: user._id,
    };

    const accessToken = await generateToken(
      dataForAccessToken,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_LIFE
    );
    if (!accessToken) {
      return res.status(401).send("email or password incorrect");
    }
    return res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
export const changePassword = async (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  try {
    const user = await users.findOne({ _id: id });
    if (user.length < 1) {
      return res.status(401).send({ message: "Email or password incorrect" });
    }
    const validPassword = await bcrypt.compareSync(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "password incorrect" });
    }
    const hashPassword = bcrypt.hashSync(newPassword, saltRounds);
    const updateUser = await users.updateOne(
      { _id: id },
      {
        $set: { password: hashPassword },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
export const ResetPassword = async (req, res, next) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  try {
    const user = await users.findOne({ _id: id });
    if (user.length < 1) {
      return res.status(401).send({ message: "Email or password incorrect" });
    }
    const hashPassword = bcrypt.hashSync(newPassword, saltRounds);
    const updateUser = await users.updateOne(
      { _id: id },
      {
        $set: { password: hashPassword },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await users.findOne({ email });
    if (user.length < 1) {
      return res.status(401).send({ message: "Email or password incorrect" });
    }
    if (!user.verifyCode) {
      return res.status(401).send({ message: "Account don't verify!!" });
    }
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Email or password incorrect" });
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const dataForAccessToken = {
      id: user._id,
    };

    const accessToken = await generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return res.status(401).send("email or password incorrect");
    }
    let refreshToken = randToken.generate(64);

    if (user.refreshToken == "") {
      const updateUser = await users.updateOne(
        { email },
        {
          $set: { refreshToken: refreshToken },
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateUser);
    } else {
      refreshToken = user.refreshToken;
    }
    // localStorage.setItem("accessToken", JSON.stringify(accessToken));
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

//reset password
export const resetPassword = async (req, res, next) => {
  const email = req.params.email;
  try {
    const user = await users.find({ email });
    if (user.length < 1) {
      res.status(403).send({ message: `User ${user[0].email} not found` });
    } else {
      sendMail(
        email,
        "Reset Password",
        `<!DOCTYPE html>
        <html lang="en">
        
        
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <link rel="icon" href="images/favicon.png" type="image/x-icon">
        
            <title>Reset Password</title>
        
            <link rel="preconnect" href="https://fonts.googleapis.com/">
            <link
                href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
                rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&amp;display=swap"
                rel="stylesheet">
        
                <style type="text/css">
                body {
                    text-align: center;
                    margin: 0 auto;
                    width: 650px;
                    font-family: 'Public Sans', sans-serif;
                    background-color: #e2e2e2;
                    display: block;
                }
        
                ul {
                    margin: 0;
                    padding: 0;
                }
        
                li {
                    display: inline-block;
                    text-decoration: unset;
                }
        
                a {
                    text-decoration: none;
                }
        
                h5 {
                    margin: 10px;
                    color: #777;
                }
        
                .text-center {
                    text-align: center
                }
        
                .header-menu ul li+li {
                    margin-left: 20px;
                }
        
                .header-menu ul li a {
                    font-size: 14px;
                    color: #252525;
                    font-weight: 500;
                }
        
                .password-button {
                    background-color: #0DA487;
                    border: none;
                    color: #fff;
                    padding: 14px 26px;
                    font-size: 18px;
                    border-radius: 6px;
                    font-weight: 600;
                }
        
                .footer-table {
                    position: relative;
                }
        
                .footer-table::before {
                    position: absolute;
                    content: "";
                    background-image: url(images/footer-left.svg);
                    background-position: top right;
                    top: 0;
                    left: -71%;
                    width: 100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    z-index: -1;
                    background-size: contain;
                    opacity: 0.3;
                }
        
                .footer-table::after {
                    position: absolute;
                    content: "";
                    background-image: url(images/footer-right.svg);
                    background-position: top right;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    z-index: -1;
                    background-size: contain;
                    opacity: 0.3;
                }
        
                .theme-color {
                    color: #0DA487;
                }
            </style>
        </head>
        
        <body style="margin: 20px auto; text-align: center;
        
        width: 650px;
        
        background-color: #e2e2e2;
        display: block;">
        <table align="center" border="0" cellpadding="0" cellspacing="0"
        style="background-color: white; width: 100%; box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);-webkit-box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);">
        <tbody>
            <tr>
                <td>
                    <table class="header-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr class="header"
                            style="background-color: #f7f7f7;display: flex;align-items: center;justify-content: space-between;width: 100%;">
                            <td class="header-logo" style="padding: 10px 32px;">
                                <a href="https://themes.pixelstrap.com/fastkart/front-end/index.html" style="display: block; text-align: left;">
                                    <img src="https://res.cloudinary.com/dthybdbt9/image/upload/v1684120775/SUPERMARKET_b10j87.png" style="width:100px; height: 18px;" class="main-logo" alt="logo">
                                </a>
                            </td>
                            
                        </tr>
                    </table>

                    <table class="contant-table" style="margin-top: 40px;" align="center" border="0" cellpadding="0"
                        cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <td>
                                    <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/reset.png" alt="">
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <table class="contant-table" style="margin-top: 40px;" align="center" border="0" cellpadding="0"
                        cellspacing="0" width="100%">
                        <thead>
                            <tr style="display: block;">
                                <td style="display: block;">
                                    <h3 style="font-weight: 700; font-size: 20px; margin: 0;">Reset Password</h3>
                                </td>

                                <td style="display: block;">
                                    <h3
                                        style="font-weight: 700; font-size: 20px; margin: 0;color: #939393;margin-top: 15px;">
                                        Hi ${user[0].fullName},</h3>
                                </td>

                                <td>
                                    <p
                                        style="font-size: 17px;font-weight: 600;width: 74%;margin: 8px auto 0;line-height: 1.5;color: #939393;">
                                        We’re Sending you this email because You requested a password reset. click on
                                        this link to create a new password:</p>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <table class="button-table" style="margin-top: 27px;" align="center" border="0" cellpadding="0"
                        cellspacing="0" width="100%">
                        <thead>
                            <tr style="display: block;">
                                <td style="display: block;">
                                    <a href="https://candid-eclair-3dd2d2.netlify.app/resetpassword/${email}" class="password-button" style="color: white;">Set a new password</a>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <table class="contant-table" style="margin-top: 27px;" align="center" border="0" cellpadding="0"
                        cellspacing="0" width="100%">
                        <thead>
                            <tr style="display: block;">
                                <td style="display: block;">
                                    <p
                                        style="font-size: 17px;font-weight: 600;width: 74%;margin: 8px auto 0;line-height: 1.5;color: #939393;">
                                        If you didn’t request a password reset, you can ignore this email. your password
                                        will not be changed.</p>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <table class="text-center footer-table" align="center" border="0" cellpadding="0" cellspacing="0"
                        width="100%"
                        style="background-color: #282834; color: white; padding: 24px; overflow: hidden; z-index: 0; margin-top: 30px;">
                        <tr>
                            <td>
                                
                                <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                          align="center" style="margin: 8px auto 11px;">
                                          <tr>
                                              <td>
                                                  <h4 style="font-size: 19px; font-weight: 700; margin: 0;">Shop For <span
                                                          class="theme-color">Supermarket</span></h4>
                                              </td>
                                          </tr>
                                      </table>
                                      <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                          align="center" style="margin: 8px auto 20px;">
                                          <tr>
                                              <td>
                                                  <a href="javascript:void(0)"
                                                      style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize;">Contact
                                                      Us</a>
                                              </td>
                                              <td>
                                                  <a href="javascript:void(0)"
                                                      style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize; margin-left: 20px;">unsubscribe</a>
                                              </td>
                                              <td>
                                                  <a href="javascript:void(0)"
                                                      style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize; margin-left: 20px;">privacy
                                                      Policy</a>
                                              </td>
                                          </tr>
                                      </table>
                                      <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                          align="center" style="margin: 23px auto;">
                                          <tr>
                                              <td>
                                                  <a href="www.facebook.html">
                                                      <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/fb.png"
                                                          style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                          alt="">
                                                  </a>
                                              </td>
                                              <td>
                                                  <a href="www.twitter.html">
                                                      <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/twitter.png"
                                                          style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                          alt="">
                                                  </a>
                                              </td>
                                              <td>
                                                  <a href="www.instagram.html">
                                                      <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/insta.png"
                                                          style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                          alt="">
                                                  </a>
                                              </td>
                                              <td>
                                                  <a href="www.pinterest.html">
                                                      <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/pinterest.png"
                                                          style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                          alt="">
                                                  </a>
                                              </td>
                                          </tr>
                                      </table>
                                
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
        </body>
        </html>`
      );
      res.status(200).send({ success: "Send Email Successfully" });
    }
  } catch (error) {
    next("reset password" + error);
  }
};

export const createUser = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await users.find({ email });
    if (user.length > 0) {
      res.status(403).send({ message: `User ${user[0].email} already exists` });
    } else {
      const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const newUser = new users({
        ...req.body,
        password: hashPassword,
      });

      const savedUser = await newUser.save();
      sendMail(
        email,
        "Verify Email",
        `<!DOCTYPE html>
      <html lang="en">
      
      
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
      
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
          <link rel="icon" href="images/favicon.png" type="image/x-icon">
      
          <title>Verify Password</title>
      
          <link rel="preconnect" href="https://fonts.googleapis.com/">
          <link
              href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
              rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&amp;display=swap"
              rel="stylesheet">
      
          <style type="text/css">
              body {
                  text-align: center;
                  margin: 0 auto;
                  width: 650px;
                  font-family: 'Public Sans', sans-serif;
                  background-color: #e2e2e2;
                  display: block;
              }
      
              .mb-3 {
                  margin-bottom: 30px;
              }
      
              ul {
                  margin: 0;
                  padding: 0;
              }
      
              li {
                  display: inline-block;
                  text-decoration: unset;
              }
      
              a {
                  text-decoration: none;
              }
      
              h5 {
                  margin: 10px;
                  color: #777;
              }
      
              .text-center {
                  text-align: center
              }
      
              .header-menu ul li+li {
                  margin-left: 20px;
              }
      
              .header-menu ul li a {
                  font-size: 14px;
                  color: #252525;
                  font-weight: 500;
              }
      
              .password-button {
                  background-color: #0DA487;
                  border: none;
                  color: #fff;
                  padding: 14px 26px;
                  font-size: 18px;
                  border-radius: 6px;
                  font-weight: 700;
                  font-family: 'Nunito Sans', sans-serif;
              }
      
              .footer-table {
                  position: relative;
              }
      
              .footer-table::before {
                  position: absolute;
                  content: "";
                  background-image: url(images/footer-left.svg);
                  background-position: top right;
                  top: 0;
                  left: -71%;
                  width: 100%;
                  height: 100%;
                  background-repeat: no-repeat;
                  z-index: -1;
                  background-size: contain;
                  opacity: 0.3;
              }
      
              .footer-table::after {
                  position: absolute;
                  content: "";
                  background-image: url(images/footer-right.svg);
                  background-position: top right;
                  top: 0;
                  right: 0;
                  width: 100%;
                  height: 100%;
                  background-repeat: no-repeat;
                  z-index: -1;
                  background-size: contain;
                  opacity: 0.3;
              }
      
              .theme-color {
                  color: #0DA487;
              }
          </style>
      </head>
      
      <body style="margin: 20px auto; text-align: center;
      
      width: 650px;
      
      background-color: #e2e2e2;
      display: block;">
          <table align="center" border="0" cellpadding="0" cellspacing="0"
              style="background-color: white;text-align: center; width: 100%; box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);-webkit-box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);">
              <tbody>
                  <tr>
                      <td>
                          <table class="header-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr class="header" style="background-color: #f7f7f7;
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                              width: 100%;">
                                  <td class="header-logo" style="padding: 10px 32px;">
                                      <a href="" style="display: block; text-align: left;">
                                          <img src="https://res.cloudinary.com/dthybdbt9/image/upload/v1684120775/SUPERMARKET_b10j87.png" style="width:100px; height: 18px;" class="main-logo" alt="logo">
                                      </a>
                                  </td>
                              </tr>
                          </table>
      
                          <table class="contant-table" style="margin-bottom: -6px;" align="center" border="0" cellpadding="0"
                              cellspacing="0" width="100%">
                              <thead>
                                  <tr>
                                      <td>
                                          <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/welcome-poster.jpg" alt="">
                                      </td>
                                  </tr>
                              </thead>
                          </table>
      
                          <table class="contant-table" style="margin-top: 40px;" align="center" border="0" cellpadding="0"
                              cellspacing="0" width="100%">
                              <thead>
                                  <tr style="display: block;">
                                      <td style="display: block;">
                                          <h3
                                              style="font-weight: 700; font-size: 20px; margin: 0; text-transform: uppercase;">
                                              Hi ${savedUser.fullName} And Welcome To Supermarket.!</h3>
                                      </td>
      
                                      <td>
                                          <p
                                              style="font-size: 14px;font-weight: 600;width: 82%;margin: 8px auto 0;line-height: 1.5;color: #939393;font-family: 'Nunito Sans', sans-serif;">
                                              We hope our product will lead you, like many other before you. to a place where
                                              yourideas where your ideas can spark and grow.n a place where you’ll find all
                                              your inspiration needs. before we get started, we’ll need to verify your email.
                                          </p>
                                      </td>
                                  </tr>
                              </thead>
                          </table>
      
                          <table class="button-table" style="margin: 34px 0;" align="center" border="0" cellpadding="0"
                              cellspacing="0" width="100%">
                              <thead>
                                  <tr style="display: block;">
                                      <td style="display: block;">
                                          <a href="${process.env.APP_URL}/users/verify/${email}"class="password-button" style="color: white;">Verify Email</a>
                                      </td>
                                  </tr>
                              </thead>
                          </table>
      
                          <table class="contant-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                              <thead>
                                  <tr style="display: block;">
                                      <td style="display: block;">
                                          <p
                                              style="font-size: 14px; font-weight: 600; width: 82%; margin: 0 auto; line-height: 1.5; color: #939393; font-family: 'Nunito Sans', sans-serif;">
                                              If you have any question, please email us at <span
                                                  class="theme-color">supermarket@gmail.com</span> or vixit our <span
                                                  class="theme-color">FAQs.</span> You can also chat with a real live human
                                              during our operating hours. they can answer questions about account or help you
                                              with your meditation practice.</p>
                                      </td>
                                  </tr>
                              </thead>
                          </table>
      
                          <table class="text-center footer-table" align="center" border="0" cellpadding="0" cellspacing="0"
                              width="100%"
                              style="background-color: #282834; color: white; padding: 24px; overflow: hidden; z-index: 0; margin-top: 30px;">
                              <tr>
                                  <td>
                                      <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                          align="center" style="margin: 8px auto 11px;">
                                          <tr>
                                              <td>
                                                  <h4 style="font-size: 19px; font-weight: 700; margin: 0;">Shop For <span
                                                          class="theme-color">Supermarket</span></h4>
                                              </td>
                                          </tr>
                                      </table>
                                      <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                          align="center" style="margin: 8px auto 20px;">
                                          <tr>
                                              <td>
                                                  <a href="javascript:void(0)"
                                                      style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize;">Contact
                                                      Us</a>
                                              </td>
                                              <td>
                                                  <a href="javascript:void(0)"
                                                      style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize; margin-left: 20px;">unsubscribe</a>
                                              </td>
                                              <td>
                                                  <a href="javascript:void(0)"
                                                      style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize; margin-left: 20px;">privacy
                                                      Policy</a>
                                              </td>
                                          </tr>
                                      </table>
                                      <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                          align="center" style="margin: 23px auto;">
                                          <tr>
                                              <td>
                                                  <a href="www.facebook.html">
                                                      <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/fb.png"
                                                          style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                          alt="">
                                                  </a>
                                              </td>
                                              <td>
                                                  <a href="www.twitter.html">
                                                      <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/twitter.png"
                                                          style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                          alt="">
                                                  </a>
                                              </td>
                                              <td>
                                                  <a href="www.instagram.html">
                                                      <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/insta.png"
                                                          style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                          alt="">
                                                  </a>
                                              </td>
                                              <td>
                                                  <a href="www.pinterest.html">
                                                      <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/pinterest.png"
                                                          style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                          alt="">
                                                  </a>
                                              </td>
                                          </tr>
                                      </table>
                                      
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </body>
      </html>`
      );
      res.status(200).send({ success: "Sign Up Successfully" });
    }
  } catch (error) {
    next(error);
  }
};
export const createUserWithGG = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await users.find({ email });
    if (user.length > 0) {
      res.status(403).send({ message: `User ${user[0].email} already exists` });
    } else {
      const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const newUser = new users({
        ...req.body,
        password: hashPassword,
      });
      const savedUser = await newUser.save();
      sendMail(
        email,
        "Welcome to Supermarket",
        `<!DOCTYPE html>
        <html lang="en">
        
        
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <link rel="icon" href="images/favicon.png" type="image/x-icon">
        
            <title>Verify Password</title>
        
            <link rel="preconnect" href="https://fonts.googleapis.com/">
            <link
                href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
                rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&amp;display=swap"
                rel="stylesheet">
        
            <style type="text/css">
                body {
                    text-align: center;
                    margin: 0 auto;
                    width: 650px;
                    font-family: 'Public Sans', sans-serif;
                    background-color: #e2e2e2;
                    display: block;
                }
        
                .mb-3 {
                    margin-bottom: 30px;
                }
        
                ul {
                    margin: 0;
                    padding: 0;
                }
        
                li {
                    display: inline-block;
                    text-decoration: unset;
                }
        
                a {
                    text-decoration: none;
                }
        
                h5 {
                    margin: 10px;
                    color: #777;
                }
        
                .text-center {
                    text-align: center
                }
        
                .header-menu ul li+li {
                    margin-left: 20px;
                }
        
                .header-menu ul li a {
                    font-size: 14px;
                    color: #252525;
                    font-weight: 500;
                }
        
                .password-button {
                    background-color: #0DA487;
                    border: none;
                    color: #fff;
                    padding: 14px 26px;
                    font-size: 18px;
                    border-radius: 6px;
                    font-weight: 700;
                    font-family: 'Nunito Sans', sans-serif;
                }
        
                .footer-table {
                    position: relative;
                }
        
                .footer-table::before {
                    position: absolute;
                    content: "";
                    background-image: url(images/footer-left.svg);
                    background-position: top right;
                    top: 0;
                    left: -71%;
                    width: 100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    z-index: -1;
                    background-size: contain;
                    opacity: 0.3;
                }
        
                .footer-table::after {
                    position: absolute;
                    content: "";
                    background-image: url(images/footer-right.svg);
                    background-position: top right;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background-repeat: no-repeat;
                    z-index: -1;
                    background-size: contain;
                    opacity: 0.3;
                }
        
                .theme-color {
                    color: #0DA487;
                }
            </style>
        </head>
        
        <body style="margin: 20px auto; text-align: center;
        
        width: 650px;
        
        background-color: #e2e2e2;
        display: block;">
            <table align="center" border="0" cellpadding="0" cellspacing="0"
                style="background-color: white;text-align: center; width: 100%; box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);-webkit-box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);">
                <tbody>
                    <tr>
                        <td>
                            <table class="header-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr class="header" style="background-color: #f7f7f7;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                width: 100%;">
                                    <td class="header-logo" style="padding: 10px 32px;">
                                        <a href="" style="display: block; text-align: left;">
                                            <img src="https://res.cloudinary.com/dthybdbt9/image/upload/v1684120775/SUPERMARKET_b10j87.png" style="width:100px; height: 18px;" class="main-logo" alt="logo">
                                        </a>
                                    </td>
                                </tr>
                            </table>
        
                            <table class="contant-table" style="margin-bottom: -6px;" align="center" border="0" cellpadding="0"
                                cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <td>
                                            <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/welcome-poster.jpg" alt="">
                                        </td>
                                    </tr>
                                </thead>
                            </table>
        
                            <table class="contant-table" style="margin-top: 40px;" align="center" border="0" cellpadding="0"
                                cellspacing="0" width="100%">
                                <thead>
                                    <tr style="display: block;">
                                        <td style="display: block;">
                                            <h3
                                                style="font-weight: 700; font-size: 20px; margin: 0; text-transform: uppercase;">
                                                Hi ${savedUser.fullName} And Welcome To Supermarket.!</h3>
                                        </td>
        
                                        <td>
                                            <p
                                                style="font-size: 14px;font-weight: 600;width: 82%;margin: 8px auto 0;line-height: 1.5;color: #939393;font-family: 'Nunito Sans', sans-serif;">
                                                We hope our product will lead you, like many other before you. to a place where
                                                yourideas where your ideas can spark and grow.n a place where you’ll find all
                                                your inspiration needs.
                                            </p>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
        
                            <table class="contant-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <thead>
                                    <tr style="display: block;">
                                        <td style="display: block;">
                                            <p
                                                style="font-size: 14px; font-weight: 600; width: 82%; margin: 0 auto; line-height: 1.5; color: #939393; font-family: 'Nunito Sans', sans-serif;">
                                                If you have any question, please email us at <span
                                                    class="theme-color">supermarket@gmail.com</span> or vixit our <span
                                                    class="theme-color">FAQs.</span> You can also chat with a real live human
                                                during our operating hours. they can answer questions about account or help you
                                                with your meditation practice.</p>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
        
                            <table class="text-center footer-table" align="center" border="0" cellpadding="0" cellspacing="0"
                                width="100%"
                                style="background-color: #282834; color: white; padding: 24px; overflow: hidden; z-index: 0; margin-top: 30px;">
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                            align="center" style="margin: 8px auto 11px;">
                                            <tr>
                                                <td>
                                                    <h4 style="font-size: 19px; font-weight: 700; margin: 0;">Shop For <span
                                                            class="theme-color">Supermarket</span></h4>
                                                </td>
                                            </tr>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                            align="center" style="margin: 8px auto 20px;">
                                            <tr>
                                                <td>
                                                    <a href="javascript:void(0)"
                                                        style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize;">Contact
                                                        Us</a>
                                                </td>
                                                <td>
                                                    <a href="javascript:void(0)"
                                                        style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize; margin-left: 20px;">unsubscribe</a>
                                                </td>
                                                <td>
                                                    <a href="javascript:void(0)"
                                                        style="text-decoration: none; font-size: 14px; font-weight: 600; color: #fff; text-transform: capitalize; margin-left: 20px;">privacy
                                                        Policy</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                            align="center" style="margin: 23px auto;">
                                            <tr>
                                                <td>
                                                    <a href="www.facebook.html">
                                                        <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/fb.png"
                                                            style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                            alt="">
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="www.twitter.html">
                                                        <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/twitter.png"
                                                            style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                            alt="">
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="www.instagram.html">
                                                        <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/insta.png"
                                                            style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                            alt="">
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="www.pinterest.html">
                                                        <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/pinterest.png"
                                                            style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                            alt="">
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
        </html>`
      );
      res.status(200).send(savedUser);
    }
  } catch (error) {
    next(error);
  }
};

export const isAuth = async (req, res, next) => {
  // Lấy access token từ header
  try {
    const accessTokenFromHeader = req.headers.x_authorization.split(" ")[1];
    if (!accessTokenFromHeader) {
      return res.status(401).send("accessToken not found");
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await decodeToken(
      accessTokenFromHeader,
      accessTokenSecret
    );
    if (!verified) {
      return res.status(401).send("you not authorization!!");
    }

    const user = await users.findById(verified.payload.id);
    req.user = user;
    return next();
  } catch (error) {
    console.log("authorization: " + error);
    next(error);
  }
};

//get User
export const GetUser = async (req, res, next) => {
  try {
    const user = await users.findOne({ email: req.params.email });
    res.status(200).json({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      store: user.store,
      photos: user.photos,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log("get user: ", error);
    next(error);
  }
};

//Get all users
export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await users.findAll();
    res.status(200).json("get all users");
  } catch (error) {
    next(error);
  }
};
//delete Image in Cloudinary
export const deleteImageInCloudinary = async (req, res, next) => {
  try {
    const user = await users.findById(req.params.id);

    try {
      let public_id = user.photos.split("/").at(-1).split(".").at(0);
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
//update User
export const UpdateUser = async (req, res, next) => {
  try {
    const updatedUser = await users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
//verify

export const Verify = async (req, res, next) => {
  try {
    const updatedUser = await users.updateOne(
      { email: req.params.email },
      {
        $set: { verifyCode: true },
      },
      {
        new: true,
      }
    );
    // res.status(200).json(updatedUser);
    res.redirect("https://rad-marigold-004d59.netlify.app/");
  } catch (error) {
    next(error);
  }
};
