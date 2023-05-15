import React, { useEffect, useState } from "react";
import {
  FiHeart,
  FiMapPin,
  FiPhoneCall,
  FiSearch,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";

//Banner
import logo1 from "../../../assets/images/SUPERMARKET.png";

//Product
import { useCartContext } from "../../../redux/contexts/cartContexts/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { useWishListContext } from "../../../redux/contexts/wishlistContext/wishlistContext";
import { useUserContext } from "../../../redux/contexts/loginContext/loginContext";
import axios from "axios";
import { useFillterProductContext } from "../../../redux/contexts/filterProductContext/filterProductContext";
import { MdClose } from "react-icons/md";

export const NavbarTop = ({ setShowNavBarMobile, showNavBarMobile }) => {
  const { cart } = useCartContext();
  const { setKey } = useFillterProductContext();
  const { wishlistItems } = useWishListContext();
  const { user, logout } = useUserContext();
  const [users, setUsers] = useState([]);
  const [listProducts, setProducts] = useState([]);
  const [logOuts, setLogOuts] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        X_authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    await axios.get("https://super-market-2ebn.onrender.com/api/users/logout", config);
    localStorage.setItem("accessToken", "");
    localStorage.removeItem("users");
    logout();
    setLogOuts(true);
    navigate("/");
  };
  const handleSearchKey = (key) => {
    setKeySearch(key);
    setKey(key);
  };
  const handleClickSearch = () => {
    document
      .querySelector(".search-box .dropdown-menu.dropdown-menu-2")
      .classList.add("show");
    document.querySelector(".modal-backdrop.fade").classList.add("show");
  };
  const handleClickCloseSearch = () => {
    document.querySelector(".modal-backdrop.fade").classList.remove("show");
    document
      .querySelector(".search-box .dropdown-menu.dropdown-menu-2")
      .classList.remove("show");
  };
  const handleClickSearchMini = () => {
    document.querySelector(".search-full").classList.add("open");
  };
  const handleClickCloseSearchMini = () => {
    document.querySelector(".search-full").classList.remove("open");
  };
  const getListProduct = async () => {
    const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/product/search/${keySearch}`);
    setProducts(data);
  };
  const redirect = () => {
    navigate(`/searchProduct`);
  };
  useEffect(() => {
    setUsers([]);
  }, [logOuts]);
  useEffect(() => {
    if (keySearch !== "") {
      getListProduct();
    }
  }, [keySearch]);
  useEffect(() => {
    const getUser = async () => {
      try {
        if (user.length === 0) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              X_authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          };
          const { data } = await axios.get(
            `https://super-market-2ebn.onrender.com/api/users/get/${localStorage.getItem("users")}`,
            config
          );
          setUsers(data);

          setLogOuts(false);
        }
      } catch (error) {
        console.log("load page");
      }
    };
    getUser();
  }, []);
  return (
    <>
      <div class="top-nav top-header sticky-header">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <div class="navbar-top">
                <button
                  class="navbar-toggler d-xl-none d-inline navbar-menu-button"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#primaryMenu"
                  onClick={() => setShowNavBarMobile(!showNavBarMobile)}
                >
                  <span class="navbar-toggler-icon">
                    <VscThreeBars className="feather feather-search" />
                  </span>
                </button>
                <Link to="/" class="web-logo nav-logo">
                  <img src={logo1} class="img-fluid  lazyload" alt="" />
                </Link>

                <div class="middle-box">
                  <div class="location-box">
                    <button
                      class="btn location-button"
                      data-bs-toggle="modal"
                      data-bs-target="#locationModal"
                    >
                      <span class="location-arrow">
                        <FiMapPin />
                      </span>
                      <span class="locat-name">Your Location</span>
                      <FaAngleDown />
                    </button>
                  </div>

                  <div class="search-box">
                    <div class="input-group">
                      <input
                        type="search"
                        class="form-control"
                        placeholder="I'm searching for..."
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onClick={() => handleClickSearch()}
                        onChange={(e) => handleSearchKey(e.target.value)}
                      />
                      <button
                        class="btn"
                        type="button"
                        id="button-addon2"
                        onClick={() => redirect()}
                      >
                        <FiSearch className="feather feather-search" />
                      </button>
                    </div>
                    <div class="dropdown-menu dropdown-menu-2">
                      <div class="row">
                        <div class="dropdown-column col-xl-12">
                          {listProducts.length > 0 && (
                            <>
                              {listProducts.slice(0, 4).map((item, index) => (
                                <div className="product-box-3" key={index}>
                                  <div className="product-header">
                                    <div className="product-image">
                                      <Link to={`/product/${item._id}`}>
                                        <img src={item.photos[0]} alt="" />
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="product-footer">
                                    <div className="product-detail">
                                      <Link to={`/product/${item._id}`}>
                                        <h5 className="name">
                                          {item.productname}
                                        </h5>
                                      </Link>
                                      <div class="product-rating mt-sm-2 mt-1">
                                        <h6 className="name">
                                          {item.comments.length} Customer
                                          comments
                                        </h6>
                                      </div>
                                      <h5 class="price">
                                        <span class="theme-color">
                                          ${item.discount}
                                        </span>{" "}
                                        <del>${item.price}</del>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="rightside-box">
                  <div class="search-full show" style={{ zIndex: "100000" }}>
                    <div class="input-group">
                      <span class="input-group-text" onClick={() => redirect()}>
                        <FiSearch className="feather feather-search" />
                      </span>
                      <input
                        type="text"
                        class="form-control search-type"
                        placeholder="Search here.."
                        onChange={(e) => handleSearchKey(e.target.value)}
                      />
                      <span
                        class="input-group-text close-search"
                        onClick={() => handleClickCloseSearchMini()}
                      >
                        <MdClose className="feather feather-search" />
                      </span>
                    </div>
                  </div>
                  <ul class="right-side-menu">
                    <li class="right-side">
                      <div class="delivery-login-box">
                        <div class="delivery-icon">
                          <div
                            class="search-box"
                            onClick={() => handleClickSearchMini()}
                          >
                            <FiSearch className="feather feather-search" />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="right-side">
                      <Link href="contact-us.html" class="delivery-login-box">
                        <div class="delivery-icon">
                          <FiPhoneCall className="feather feather-search" />
                        </div>
                        <div class="delivery-detail">
                          <h6>24/7 Delivery</h6>
                          <h5>+91 888 104 2340</h5>
                        </div>
                      </Link>
                    </li>
                    <li class="right-side">
                      <Link
                        to="/wishlist"
                        class="btn p-0 position-relative header-wishlist"
                      >
                        <FiHeart className="feather feather-search" />
                        <span class="position-absolute top-0 start-100 translate-middle badge">
                          {wishlistItems.length}
                          <span class="visually-hidden">unread messages</span>
                        </span>
                      </Link>
                    </li>
                    <li class="right-side">
                      <div class="onhover-dropdown header-badge">
                        <button
                          type="button"
                          class="btn p-0 position-relative header-wishlist"
                        >
                          <FiShoppingCart className="feather feather-search" />
                          <span class="position-absolute top-0 start-100 translate-middle badge">
                            {cart.length}
                            <span class="visually-hidden">unread messages</span>
                          </span>
                        </button>

                        <div class="onhover-div">
                          <ul class="cart-list">
                            {cart.map((item, index) => (
                              <li class="product-box-contain" key={index}>
                                <div class="drop-cart">
                                  <Link
                                    href="product-left-thumbnail.html"
                                    class="drop-image"
                                  >
                                    <img
                                      src={item.product.photos[0]}
                                      class="blur-up lazyload"
                                      alt=""
                                    />
                                  </Link>

                                  <div class="drop-contain">
                                    <Link href="product-left-thumbnail.html">
                                      <h5>{item.product.productname}</h5>
                                    </Link>
                                    <h6>
                                      <span>{item.amount} x</span> $
                                      {item.product.discount}
                                    </h6>
                                    <button class="close-button close_button">
                                      <i class="fa-solid fa-xmark"></i>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>

                          {/* <div class="price-box">
                            <h5>Total :</h5>
                            <h4 class="theme-color fw-bold">${(Number(total_items)+fee_shipping).toFixed(1)}</h4>
                          </div> */}

                          <div class="button-group">
                            <Link to="/cart" class="btn btn-sm cart-button">
                              View Cart
                            </Link>
                            {cart.length > 0 && (
                              <Link
                                to="/checkout"
                                class="btn btn-sm cart-button theme-bg-color
                                                      text-white"
                              >
                                Checkout
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="right-side onhover-dropdown">
                      <div class="delivery-login-box">
                        {user.length > 0 || users.hasOwnProperty("fullName") ? (
                          <>
                            <div
                              class="delivery-detail"
                              style={{ display: "block" }}
                            >
                              <h6>Hello,</h6>
                              <h5>
                                {user.length > 0
                                  ? user[0].user.fullName
                                  : users.fullName}
                              </h5>
                            </div>
                          </>
                        ) : (
                          <>
                            <div class="delivery-icon">
                              <FiUser className="feather feather-search" />
                            </div>
                          </>
                        )}
                      </div>

                      <div class="onhover-div onhover-div-login">
                        {user.length > 0 || users.hasOwnProperty("fullName") ? (
                          <>
                            <ul class="user-box-name">
                              <li class="product-box-contain">
                                <i></i>
                                <Link to="/profile">My profile</Link>
                              </li>
                              {(users.isAdmin || user[0]?.user.isAdmin) && (
                                <>
                                  {(users.hasOwnProperty("store") &&
                                    users.store !== "") ||
                                  user[0]?.user.store ? (
                                    <li class="product-box-contain">
                                      <Link to="/dashboard">
                                        Seller Dashboard
                                      </Link>
                                    </li>
                                  ) : (
                                    <li class="product-box-contain">
                                      <Link to="/becomeSeller">
                                        Become seller
                                      </Link>
                                    </li>
                                  )}
                                </>
                              )}

                              <li
                                class="product-box-contain"
                                onClick={handleLogout}
                              >
                                <Link>Log out</Link>
                              </li>
                            </ul>
                          </>
                        ) : (
                          <>
                            <ul class="user-box-name">
                              <li class="product-box-contain">
                                <i></i>
                                <Link to="/login">Log In</Link>
                              </li>

                              <li class="product-box-contain">
                                <Link to="/register">Register</Link>
                              </li>

                              <li class="product-box-contain">
                                <Link to="/forgot">Forgot Password</Link>
                              </li>
                            </ul>
                          </>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal-backdrop fade"
        onClick={() => handleClickCloseSearch()}
      ></div>
    </>
  );
};
