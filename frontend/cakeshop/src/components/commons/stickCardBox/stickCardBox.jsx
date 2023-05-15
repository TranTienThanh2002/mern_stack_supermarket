import React, { useState } from "react";
import product1 from "../../../assets/images/product/category/1.jpg";
import { BiMinus, BiPlus } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "../../../redux/contexts/cartContexts/cartContext";
import { useWishListContext } from "../../../redux/contexts/wishlistContext/wishlistContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";
export const StickCardBox = ({ data, quantity, setQuantity }) => {
  const [visible, setVisible] = useState(false);
  const { addToCart } = useCartContext();
  const { addWishlist } = useWishListContext();
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
      const element = document.querySelector("body");
      element.classList.add("stickyCart");
    } else {
      setVisible(false);
      const element = document.querySelector("body");
      element.classList.remove("stickyCart");
    }
  };
  window.addEventListener("scroll", toggleVisible);
  const handleClickAddToCart = async (e) => {
    e.preventDefault();
    try {
      addToCart(data._id, "", quantity, data);
      NotificationManager.success("Add to cart success", "Cart products", 2000);
    } catch (error) {
      NotificationManager.error("Add to cart failed", "Cart products", 2000);
    }
  };
  const handleWishlistClick = async (e) => {
    e.preventDefault();
    try {
      const id = data._id;
      var { data } = await axios.get(
        `https://super-market-2ebn.onrender.com/api/product/${id}`
      );
      addWishlist(data);
      NotificationManager.success("Add to wishlist success", "Wishlist", 2000);
    } catch (error) {
      NotificationManager.success("Add to wishlist failed", "Wishlist", 2000);
      NotificationManager.error(error.message, "Wishlist", 2000);
    }
  };
  return (
    <>
      <div class="sticky-bottom-cart">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <div class="cart-content">
                <div class="product-image">
                  <img
                    src={data.photos[0]}
                    class="img-fluid blur-up lazyload"
                    alt=""
                  />
                  <div class="content">
                    <h5>{data.productname}</h5>
                    <h6>
                      ${data.discount}
                      <del class="text-danger">${data.price}</del>
                      <span>55% off</span>
                    </h6>
                  </div>
                </div>
                <div class="selection-section">
                  <div class="form-group mb-0">
                    <select id="input-state" class="form-control form-select">
                      <option selected disabled>
                        Choose Weight...
                      </option>
                      {data.weight.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="cart_qty qty-box product-qty m-0">
                    <div class="input-group h-100">
                      <button
                        type="button"
                        class="qty-right-plus"
                        data-type="plus"
                        data-field=""
                        onClick={() =>
                          quantity <= data.qualified &&
                          setQuantity(quantity + 1)
                        }
                      >
                        <BiPlus className="icon" />
                      </button>
                      <input
                        class="form-control input-number qty-input"
                        type="text"
                        name="quantity"
                        defaultValue={quantity}
                        value={quantity}
                        onChange={(e) =>
                          quantity <= data.qualified &&
                          setQuantity(Number(e.target.value))
                        }
                      />
                      <button
                        type="button"
                        class="qty-left-minus"
                        data-type="minus"
                        data-field=""
                        onClick={() =>
                          quantity !== 0 && setQuantity(quantity - 1)
                        }
                      >
                        <BiMinus className="icon" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="add-btn">
                  <Link
                    class="btn theme-bg-color text-white wishlist-btn"
                    onClick={(e) => handleWishlistClick(e, data._id)}
                  >
                    <AiOutlineHeart
                      className="icon"
                      style={{ "margin-right": "7px" }}
                    />{" "}
                    Wishlist
                  </Link>
                  <Link
                    class="btn theme-bg-color text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClickAddToCart(e);
                    }}
                  >
                    <FaShoppingCart
                      className="icon"
                      style={{ "margin-right": "7px" }}
                    />
                    Add To Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
