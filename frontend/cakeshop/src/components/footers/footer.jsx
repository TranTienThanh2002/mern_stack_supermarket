import React from "react";
import logo1 from "../../assets/images/SUPERMARKET.png";
import { FiHome, FiInstagram, FiMail, FiPhone} from 'react-icons/fi'
import {TfiPinterest, TfiTwitterAlt} from 'react-icons/tfi'
import payment1 from "../..//assets/images/payment/1.png";
import { Link, useNavigate } from "react-router-dom";
import { useFillterProductContext } from "../../redux/contexts/filterProductContext/filterProductContext";
import { FaFacebookF } from "react-icons/fa";
export const Footer = () => {
  const { addTag,tags,removeTag } = useFillterProductContext();
  const navigate = useNavigate()
  const handleClickCategories = (e, category) => {
    e.preventDefault();
    if(tags.length > 0) {
      tags.map(item => removeTag(item))
    }
    addTag(category)
    navigate('/shop')
    
  }
  return (
    <>
      <footer class="section-t-space">
        <div class="container-fluid-lg">
          <div class="service-section">
            <div class="row g-3">
              <div class="col-12">
                <div class="service-contain">
                  <div class="service-box">
                    <div class="service-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/svg/product.svg"
                        class="blur-up lazyload"
                        alt=""
                      />
                    </div>

                    <div class="service-detail">
                      <h5>Every Fresh Products</h5>
                    </div>
                  </div>

                  <div class="service-box">
                    <div class="service-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/svg/delivery.svg"
                        class="blur-up lazyload"
                        alt=""
                      />
                    </div>

                    <div class="service-detail">
                      <h5>Free Delivery For Order Over $50</h5>
                    </div>
                  </div>

                  <div class="service-box">
                    <div class="service-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/svg/discount.svg"
                        class="blur-up lazyload"
                        alt=""
                      />
                    </div>

                    <div class="service-detail">
                      <h5>Daily Mega Discounts</h5>
                    </div>
                  </div>

                  <div class="service-box">
                    <div class="service-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/svg/market.svg"
                        class="blur-up lazyload"
                        alt=""
                      />
                    </div>

                    <div class="service-detail">
                      <h5>Best Price On The Market</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="main-footer section-b-space section-t-space">
            <div class="row g-md-4 g-3">
              <div class="col-xl-3 col-lg-4 col-sm-6">
                <div class="footer-logo">
                  <div class="theme-logo">
                    <Link to="/">
                      <img
                        src={logo1}
                        class="blur-up lazyload"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div class="footer-logo-contain">
                    <p>
                      We are a friendly bar serving a variety of cocktails,
                      wines and beers. Our bar is a perfect place for a couple.
                    </p>

                    <ul class="address">
                      <li>
                        <FiHome className="feather feather-home"/>
                        <Link  >
                          Thu Duc - Tp.HCM
                        </Link>
                      </li>
                      <li>
                        <FiMail className="feather feather-home"/>
                        <Link  >trantienthanhK18.062@gmail.com</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div class="footer-title">
                  <h4>Categories</h4>
                </div>

                <div class="footer-contain">
                  <ul>
                    <li>
                      <Link  onClick={(e)=>handleClickCategories(e, "vegetable")} class="text-content">
                        Vegetables & Fruit
                      </Link>
                    </li>
                    <li>
                      <Link  onClick={(e)=>handleClickCategories(e, "beverage")}class="text-content">
                        Beverages
                      </Link>
                    </li>
                    <li>
                      <Link  onClick={(e)=>handleClickCategories(e, "meats")}class="text-content">
                        Meats & Seafood
                      </Link>
                    </li>
                    <li>
                      <Link  onClick={(e)=>handleClickCategories(e, "frozen")}class="text-content">
                        Frozen Foods
                      </Link>
                    </li>
                    <li>
                      <Link  onClick={(e)=>handleClickCategories(e, "biscuits")}class="text-content">
                        Biscuits & Snacks
                      </Link>
                    </li>
                    <li>
                      <Link  onClick={(e)=>handleClickCategories(e, "grocery")}class="text-content">
                        Grocery & Staples
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-xl-2 col-lg-2 col-sm-6">
                <div class="footer-title">
                  <h4>Useful Links</h4>
                </div>

                <div class="footer-contain">
                  <ul>
                    <li>
                      <Link to="/" class="text-content">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link  to="/shop" class="text-content">
                        Shop
                      </Link>
                    </li>
                    
                    <li>
                      <Link to='/contact' class="text-content">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

             

              <div class="col-xl-4 col-lg-3 col-sm-6">
                <div class="footer-title">
                  <h4>Contact Us</h4>
                </div>

                <div class="footer-contact">
                  <ul>
                    <li>
                      <div class="footer-number">
                        <FiPhone/>
                        <div class="contact-number">
                          <h6 class="text-content">Hotline 24/7 :</h6>
                          <h5>+84 388004519</h5>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="footer-number">
                        <FiMail/>
                        <div class="contact-number">
                          <h6 class="text-content">Email Address :</h6>
                          <h5>trantienthanhK18.062@gmail.com</h5>
                        </div>
                      </div>
                    </li>

                    {/* <li class="social-app mb-0">
                      <h5 class="mb-2 text-content">Download App :</h5>
                      <ul>
                        <li class="mb-0">
                          <Link 
                            to="https://play.google.com/store/apps"
                            target="_blank"
                          >
                            <img
                              src="https://themes.pixelstrap.com/fastkart/assets/images/playstore.svg"
                              class="blur-up lazyload"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li class="mb-0">
                          <Link
                            to="https://www.apple.com/in/app-store/"
                            target="_blank"
                          >
                            <img
                              src="https://themes.pixelstrap.com/fastkart/assets/images/appstore.svg"
                              class="blur-up lazyload"
                              alt=""
                            />
                          </Link>
                        </li>
                      </ul>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="sub-footer section-small-space">
            <div class="reserve">
              <h6 class="text-content">©2023 Supermarket All rights reserved</h6>
            </div>

            <div class="payment">
              <img
                src={payment1}
                class="blur-up lazyload"
                alt=""
              />
            </div>

            <div class="social-link">
              <h6 class="text-content">Stay connected :</h6>
              <ul>
                <li>
                  <Link to="https://www.facebook.com/" target="_blank">
                    <FaFacebookF className="icons"/>
                  </Link>
                </li>
                <li>
                  <Link to="https://twitter.com/" target="_blank">
                    <TfiTwitterAlt className="icons"/>
                  </Link>
                </li>
                <li>
                  <Link to="https://www.instagram.com/" target="_blank">
                    <FiInstagram className="icons"/>
                  </Link>
                </li>
                <li>
                  <Link to="https://in.pinterest.com/" target="_blank">
                    <TfiPinterest className="icons"/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
