import Cart from "../models/Cart.js";
import Products from "../models/Products.js";
import Users from "../models/Users.js";
import { sendMail } from "../utils/mailer.js";
//create Cart
export const createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  const email = req.body.email;
  const productInCart = req.body.productInCart;
  const { subTotal, shipPing, Total } = req.body;

  try {
    const saveCart = await newCart.save();
    await Cart.findByIdAndUpdate(saveCart._id, {
      $set: { cartCode: saveCart._id },
    });
    await Users.findOneAndUpdate(
      { email: email },
      {
        $push: { order: saveCart._id },
      }
    );
    let html = "";
    JSON.parse(productInCart).forEach((product) => {
      const productHtml = `<tr>
        <td
            style="padding: 28px
            0;border-bottom: 1px
            solid rgba(217, 217,
            217, 0.5);">
            <img
                style="width: 127px; height: 100px;"
                src=${product.product.photos[0]}
                alt="">
        </td>
        <td
            style="padding: 28px
            0;border-bottom: 1px
            solid rgba(217, 217,
            217, 0.5);">
            <ul 
                style="text-align: left;
                display: block;
                "
                class=" product-detail" id="product-detail">
                <li style="-webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                width: 185px;
                ">${product.product.productname}</li>
                <br/>
                <li>QTY: <span>${product.amount}</span></li>
                <br/>
                <li>Price: <span>$${product.product.discount}</span></li>
            </ul>
        </td>
    </tr>`;
      html += productHtml;
    });
    let total = "";
    const address = JSON.parse(saveCart.address);
    sendMail(
      email,
      "Thanks for your order",
      `<!DOCTYPE html>
            <html lang="en">
            
            
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
            
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="icon" href="images/favicon.png" type="image/x-icon">
            
                    <title>Thanks for your order </title>
            
                    <link rel="preconnect" href="https://fonts.googleapis.com/">
                    <link
                        href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
                        rel="stylesheet">
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&amp;display=swap"
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
            
                    .main-bg-light {
                        background-color: #fafafa;
                    }
            
                    .header-menu ul li a {
                        font-size: 14px;
                        color: #252525;
                        font-weight: 500;
                    }
            
                    .product-table tbody tr td img {
                        /* width: 86%; */
                        margin-right: 26px;
                    }
            
                    .product-table tbody tr td .product-detail {
                        text-align: left;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 7px;
                    }
                    .product-table tbody tr td #product-detail {
                        text-align: left;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 7px;
                    }
                    .product-table tbody tr td ul {
                        text-align: left;
                        display: flex;
                        display:-webkit-flex;
                        flex-wrap: wrap;
                        flex-wrap: -webkit-wrap;
                        gap: 7px;
                    }
                    .product-table tbody tr td .product-detail li {
                        display: block;
                        width: 100%;
                        font-size: 16px;
                        font-weight: 600;
                        white-space: nowrap;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: auto;
                    }
            
                    .product-table tbody tr td .product-detail li span {
                        color: #939393;
                    }
            
                    .order-table {
                        background-image: url(https://themes.pixelstrap.com/fastkart/email-templete/images/order-poster.jpg);
                        background-position: center;
                        background-repeat: no-repeat;
                        border-radius: 5px;
                        overflow: hidden;
                        padding: 18px 27px;
                        margin-top: 40px;
                    }
            
                    .footer-table {
                        position: relative;
                        margin-top: 34px;
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
                </style>
                </head>
            
                <body style="margin: 20px auto; text-align: center;
      
                width: 650px;
                
                background-color: #e2e2e2;
                display: block;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                        style="background-color: #fff; box-shadow: 0px 0px 14px -4px rgba(0,
                        0, 0, 0.2705882353);-webkit-box-shadow: 0px 0px 14px -4px rgba(0, 0,
                        0, 0.2705882353);">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="header-table" align="center" border="0"
                                        cellpadding="0" cellspacing="0" width="100%">
                                        <tr class="header"
                                            style="background-color: #f7f7f7;display:
                                            flex;align-items: center;justify-content:
                                            center;width: 100%;">
                                            <td class="header-logo" style="padding: 10px
                                                32px;">
                                                <a
                                                    href="https://themes.pixelstrap.com/fastkart/front-end/index.html"
                                                    style="display: block; text-align:
                                                    left;">
                                                    <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/logo.png"
                                                        class="main-logo" alt="logo">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
            
                                    <table style="padding: 27px;" align="center" border="0"
                                        cellpadding="0" cellspacing="0"
                                        width="100%">
                                        <tr>
                                            <td>
                                                <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/order-success-poster.png"
                                                    alt="" style="width: 100%; height:
                                                    100%;">
                                            </td>
                                        </tr>
                                    </table>
            
                                    <table align="center" border="0" cellpadding="0"
                                        cellspacing="0" width="100%"
                                        style="padding: 0 27px;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="title title-2 text-center">
                                                        <h2 style="font-size:
                                                            20px;font-weight: 700;margin:
                                                            24px 0 0;">Thanks For your
                                                            Order
                                                        </h2>
                                                        <p
                                                            style="font-size: 14px;margin:
                                                            5px auto 0;line-height:
                                                            1.5;color: #939393;font-weight:
                                                            500;width: 70%;">
                                                            You'll receive an email when
                                                            your items are shipped. if you
                                                            have any
                                                            questions, Call Us 1-978-8767.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
            
                                    <table class="dilivery-table" align="center" border="0"
                                        cellpadding="0" cellspacing="0" width="100%"
                                        style="margin: 25px 27px;padding: 20px 32px;width:
                                        fit-content; background-color:
                                        #f7f7f7;">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style=" text-align: left;padding-right:
                                                    28px;border-right: 2px solid rgba(217,
                                                    217, 217, 0.5);">
                                                    <div class="title title-2"
                                                        style="text-align: left;">
                                                        <h2 style="font-size:
                                                            16px;font-weight: 700;margin: 0
                                                            0 12px;">Thanks For your
                                                            Order</h2>
                                                        <p
                                                            style="font-size: 14px;margin:
                                                            0;line-height: 1.5;color:
                                                            #939393;font-weight: 500;">${
                                                              (address, address)
                                                            }</p>
                                                    </div>
                                                </td>
            
                                                <td style=" text-align: left;padding-left:
                                                    32px;">
                                                    <div class="title title-2"
                                                        style="text-align: left;">
                                                        <h2 style="font-size:
                                                            16px;font-weight: 700;margin: 0
                                                            0 12px;">Thanks For your
                                                            Order</h2>
                                                        <p
                                                            style="font-size: 14px;margin:
                                                            0;line-height:
                                                            1.5;color:#939393;font-weight:
                                                            500;">
                                                            You'll receive an email when
                                                            your items are shipped. if you
                                                            have any
                                                            questions, Call Us 1-978-8767.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
            
                                    <table class="shipping-table" align="center" border="0"
                                        cellpadding="0" cellspacing="0" width="100%"
                                        style="padding: 0 27px; ">
                                        <thead>
                                            <tr>
                                                <th
                                                    style="font-size: 17px;font-weight:
                                                    700;padding-bottom: 8px;border-bottom:
                                                    1px solid rgba(217, 217, 217,
                                                    0.5);text-align: left;">
                                                    Shipped Items</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                style="column-count: 2;column-rule-style:
                                                dashed;column-rule-color: rgba(82, 82, 108,
                                                0.7);column-gap: 22px;column-rule-width:
                                                1px;display: flex;align-items: center;">
                                                <td style="width: 100%;">
                                                    <table class="product-table"
                                                        align="center" border="0"
                                                        cellpadding="0"
                                                        cellspacing="0" width="100%">
                                                        <tbody>
                                                        ${html}  
                                                        </tbody>
                                                    </table>
                                                </td>
            
                                                <td style="width: 70%;">
                                                    <table class="dilivery-table"
                                                        align="center" border="0"
                                                        cellpadding="0"
                                                        style="background-color:
                                                        #F7F7F7;padding: 14px;"
                                                        cellspacing="0" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td style="font-weight:
                                                                    700;font-size:
                                                                    17px;padding-bottom:
                                                                    15px;border-bottom: 1px
                                                                    solid rgba(217, 217,
                                                                    217, 0.5);"
                                                                    colspan="2">Order
                                                                    summary</td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="text-align:
                                                                    left;font-size:
                                                                    15px;font-weight:
                                                                    400;padding: 15px
                                                                    0;border-bottom: 1px
                                                                    solid rgba(217, 217,
                                                                    217, 0.5);">
                                                                    Subtotal</td>
                                                                <td
                                                                    style="text-align:
                                                                    right;font-size:
                                                                    15px;font-weight:
                                                                    400;padding: 15px
                                                                    0;border-bottom: 1px
                                                                    solid rgba(217, 217,
                                                                    217, 0.5);">
                                                                    $${subTotal}</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td
                                                                    style="text-align:
                                                                    left;font-size:
                                                                    15px;font-weight:
                                                                    400;padding: 15px
                                                                    0;border-bottom: 1px
                                                                    solid rgba(217, 217,
                                                                    217, 0.5);">
                                                                    Shipping</td>
                                                                <td
                                                                    style="text-align:
                                                                    right;font-size:
                                                                    15px;font-weight:
                                                                    400;padding: 15px
                                                                    0;border-bottom: 1px
                                                                    solid rgba(217, 217,
                                                                    217, 0.5);">
                                                                    $${shipPing}</td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="text-align:
                                                                    left;font-size:
                                                                    15px;font-weight:
                                                                    600;padding-top: 15px;">
                                                                    Total</td>
                                                                <td
                                                                    style="text-align:
                                                                    right;font-size:
                                                                    15px;font-weight:
                                                                    600;padding-top: 15px;">
                                                                    $${Total}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
            
                                    <table align="center" border="0" cellpadding="0"
                                        cellspacing="0" width="100%" class="order-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="text-center">
                                                        <h5 style="font-size:
                                                            18px;font-weight: 700;margin:
                                                            0;color: #fff;">Get 25% off
                                                            your next order</h5>
                                                        <button
                                                            style="margin-top: 10px;padding:
                                                            9px 21px;background-color:
                                                            rgba(255, 255, 255, 0.2);border:
                                                            none;color: #fff;font-weight:
                                                            700;font-size: 14px;">Awesome</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
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
                                                          class="theme-color">Fastkart</span></h4>
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
    res.status(200).json(saveCart);
  } catch (error) {
    console.log("create cart error: " + error);
    next(error);
  }
};
//update Status
export const updateStatus = async (req, res, next) => {
  const { status, userId } = req.body;
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: status },
      },
      {
        new: true,
      }
    );
    if (updateCart.status === "SUCCESS") {
      const productInCart = JSON.parse(updateCart.productInCart);

      const listProduct = await Promise.all(
        productInCart.map(async (item) => {
          let product = await Products.findById(item.id);
          return Products.findByIdAndUpdate(
            item.id,
            {
              $set: {
                sales: parseInt(product.sales) + parseInt(item.amount),
              },
              $push: {customers: userId}
            },
            {
              new: true,
            }
          );
        })
      );
    }
    res.status(200).json(updateCart);
  } catch (error) {
    console.log("update status error: " + error);
    next(error);
  }
};
//get cart by cartId
export const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    console.log("get cart error: " + error);
    next(error);
  }
};
export const getCartByEmail = async (req, res, next) => {
  const email = req.body.email;
  try {
    const cart = await Cart.findOne({ email: email });
    res.status(200).json(cart);
  } catch (error) {
    console.log("get cart error: " + error);
    next(error);
  }
};

//get all cart
export const getAllCart = async (req, res, next) => {
  const { ...other } = req.query;
  try {
    const getAllCart = await Cart.find({
      ...other,
    });
    res.status(200).json(getAllCart);
  } catch (error) {
    console.log("get all cart error: " + error);
    next(error);
  }
};

//get page cart
export const getPageCart = async (req, res, next) => {
  let { page, limit, key } = req.body;
  try {
    const getAllCart = await Cart.find({
      cartCode: { $regex: `/*${key}/*` },
    })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(getAllCart);
  } catch (error) {
    console.log("get page all cart error: " + error);
    next(error);
  }
};
//get order by user
export const getOrderByUserEmail = async (req, res, next) => {
  const email = req.params.email;
  try {
    const user = await Users.findOne({ email: email });
    const listCart = await Promise.all(
      user.order.map((id) => {
        return Cart.findById(id);
      })
    );

    res.status(200).json(listCart);
  } catch (error) {
    next("get Cart by user" + error);
  }
};
export const getPageCartByEmail = async (req, res, next) => {
  //   const email = req.body.email;
  let { page, limit, email } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    const listCart = await Cart.find({ _id: { $in: user.order } })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(listCart);
  } catch (error) {
    console.log(error);
    next("getPageCartByEmail" + error);
  }
};

export const getAllCartByKeySearch = async (req, res, next) => {
  let { limit, key } = req.body;
  try {
    const getAllCart = await Cart.find({
      cartCode: { $regex: `/*${key}/*`, $options: "i" },
    }).sort({ _id: -1 });
    res.status(200).json(getAllCart);
  } catch (error) {
    next(error);
  }
};
