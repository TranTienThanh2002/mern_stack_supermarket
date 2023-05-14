import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import { useCartContext } from "../../redux/contexts/cartContexts/cartContext";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import { FiChevronDown } from "react-icons/fi";
import Slider from "react-slick";
import useFetch from "../../hooks/useFetch";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Checkout = () => {
  const [listAddress, setListAddress] = useState([]);
  const [addressChecked, setAddressChecked] = useState([]);
  defineElement(lottie.loadAnimation);
  const { cart, setTotalItems, total_items, fee_shipping,removeItem } = useCartContext();
  const email = localStorage.getItem("users");
  const { data, loading } = useFetch(`/address/getByEmail/${email}`);
  const navigate = useNavigate();
  var settings = {
    dots: true,
    infinite: listAddress.length > 2,
    // speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: false,
    responsive: [
      
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          
        }
      }
    ]
  };
  const handleCheckChange = (e, item) => {
    if (e.target.checked) {
      setAddressChecked(item);
    }
  };
  const handlePlaceOrder = async () => {
    const order = {
      address: JSON.stringify(addressChecked),
      productInCart: JSON.stringify(cart),
      subTotal: Number(total_items).toFixed(1),
      Total: Number(total_items + fee_shipping).toFixed(1),
      shipPing: fee_shipping,
      deliveryOption: "Standard Delivery Option",
      PaymentOption: "Cash On Delivery",
      email: email
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        X_authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    try {
      const {data}= await axios.post("/cart/", order, config);
      localStorage.removeItem("CartStore");
      cart.map((item) => {
        return removeItem(item.id)
      })
      navigate(`/orderSuccess/${data._id}`)
    } catch (error) {
      console.log("add cart error: " + error);
      navigate('/login')
    }
  };
  useEffect(() => {
    setListAddress(data);
  }, [loading]);
  useEffect(() => {
    const subTotalItem = () => {
      let total = 0;
      cart.map((item) => {
        return (total += item.product.discount * item.amount);
      });
      setTotalItems(total);
    };
    subTotalItem();
  }, []);
  return (
    <>
      <BreadCrumb title="Checkout" />
      <section class="checkout-section-2 section-b-space">
        <div class="container-fluid-lg">
          <div class="row g-sm-4 g-3">
            <div class="col-lg-8">
              <div class="left-sidebar-checkout">
                <div class="checkout-detail-box">
                  <ul>
                    <li>
                      <div class="checkout-icon">
                        <lord-icon
                          target=".nav-item"
                          src="https://cdn.lordicon.com/ggihhudh.json"
                          trigger="loop-on-hover"
                          colors="primary:#121331,secondary:#646e78,tertiary:#0baf9a"
                          class="lord-icon"
                        ></lord-icon>
                      </div>
                      <div class="checkout-box">
                        <div class="checkout-title">
                          <h4>Delivery Address</h4>
                        </div>

                        <div class="checkout-detail product-wrapper">
                          <div class="row g-4">
                            {listAddress.length > 0 ? (
                              <>
                                <Slider {...settings}>
                                  {listAddress.map((item, index) => (
                                    <div
                                      class="col-xxl-6 col-lg-12 col-md-6"
                                      key={index}
                                    >
                                      <div class="delivery-address-box">
                                        <div>
                                          <div class="form-check">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name={item.lastName}
                                              id={item._id}
                                              onChange={(e) =>
                                                handleCheckChange(e, item)
                                              }
                                            />
                                          </div>

                                          <div class="label">
                                            <label>{item.type}</label>
                                          </div>

                                          <ul class="delivery-address-detail">
                                            <li>
                                              <h4 class="fw-500">
                                                {item.firstName +
                                                  " " +
                                                  item.lastName}
                                              </h4>
                                            </li>

                                            <li>
                                              <p class="text-content">
                                                <span class="text-title">
                                                  Address :{" "}
                                                </span>
                                                {item.address}
                                              </p>
                                            </li>

                                            <li>
                                              <h6 class="text-content">
                                                <span class="text-title">
                                                  Pin Code :
                                                </span>{" "}
                                                {item.pinCode}
                                              </h6>
                                            </li>

                                            <li>
                                              <h6 class="text-content mb-0">
                                                <span class="text-title">
                                                  Phone :
                                                </span>{" "}
                                                {item.phone}
                                              </h6>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </Slider>
                              </>
                            ) : (
                              <>
                                <button
                                  class="btn theme-bg-color text-white btn-sm fw-bold  mt-3"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-address"
                                  style={{
                                    width: "auto",
                                    marginLeft: "12px",
                                    marginRight: "12px",
                                  }}
                                  onClick={() => navigate("/profile")}
                                >
                                  <HiPlus className="me-2" />
                                  Add New Address
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="checkout-icon">
                        <lord-icon
                          target=".nav-item"
                          src="https://cdn.lordicon.com/oaflahpk.json"
                          trigger="loop-on-hover"
                          colors="primary:#0baf9a"
                          class="lord-icon"
                        ></lord-icon>
                      </div>
                      <div class="checkout-box">
                        <div class="checkout-title">
                          <h4>Delivery Option</h4>
                        </div>

                        <div class="checkout-detail">
                          <div class="row g-4">
                            <div class="col-xxl-12">
                              <div class="delivery-option">
                                <div class="delivery-category">
                                  <div class="shipment-detail">
                                    <div class="form-check custom-form-check hide-check-box">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="standard"
                                        id="standard"
                                        checked
                                      />
                                      <label
                                        class="form-check-label"
                                        for="standard"
                                      >
                                        Standard Delivery Option
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="checkout-icon">
                        <lord-icon
                          target=".nav-item"
                          src="https://cdn.lordicon.com/qmcsqnle.json"
                          trigger="loop-on-hover"
                          colors="primary:#0baf9a,secondary:#0baf9a"
                          class="lord-icon"
                        ></lord-icon>
                      </div>
                      <div class="checkout-box">
                        <div class="checkout-title">
                          <h4>Payment Option</h4>
                        </div>

                        <div class="checkout-detail">
                          <div
                            class="accordion accordion-flush custom-accordion"
                            id="accordionFlushExample"
                          >
                            <div class="accordion-item">
                              <div
                                class="accordion-header"
                                id="flush-headingFour"
                              >
                                <div
                                  class="accordion-button collapsed"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseFour"
                                >
                                  <FiChevronDown className="icon" />
                                  <div class="custom-form-check form-check mb-0">
                                    <label class="form-check-label" for="cash">
                                      <input
                                        class="form-check-input mt-0"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="cash"
                                        checked
                                      />{" "}
                                      Cash On Delivery
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="flush-collapseFour"
                                class="accordion-collapse collapse show"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div class="accordion-body">
                                  <p class="cod-review">
                                    Pay digitally with SMS Pay Link. Cash may
                                    not be accepted in COVID restricted areas.{" "}
                                    <a href="javascript:void(0)">Know more.</a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="right-side-summery-box">
                <div class="summery-box-2">
                  <div class="summery-header">
                    <h3>Order Summery</h3>
                  </div>

                  <ul class="summery-contain">
                    {cart.length > 0 && (
                      <>
                        {cart.map((item, index) => (
                          <li>
                            <img
                              src={item.product.photos[0]}
                              class="img-fluid blur-up lazyloaded checkout-image"
                              alt=""
                            />
                            <h4>
                              {item.product.productname}
                              <span>X {item.amount}</span>
                            </h4>
                            <h4 class="price">
                              $
                              {(item.amount * item.product.discount).toFixed(1)}
                            </h4>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>

                  <ul class="summery-total">
                    <li>
                      <h4>Subtotal</h4>
                      <h4 class="price">${Number(total_items).toFixed(1)}</h4>
                    </li>

                    <li>
                      <h4>Shipping</h4>
                      <h4 class="price">${fee_shipping}</h4>
                    </li>

                    {/* <li>
                      <h4>Tax</h4>
                      <h4 class="price">$29.498</h4>
                    </li>

                    <li>
                      <h4>Coupon/Code</h4>
                      <h4 class="price">$-23.10</h4>
                    </li> */}

                    <li class="list-total">
                      <h4>Total (USD)</h4>
                      <h4 class="price">
                        ${Number(total_items + fee_shipping).toFixed(1)}
                      </h4>
                    </li>
                  </ul>
                </div>

                <div class="checkout-offer">
                  <div class="offer-title">
                    <div class="offer-icon">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/offer.svg"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="offer-name">
                      <h6>Available Offers</h6>
                    </div>
                  </div>

                  <ul class="offer-detail">
                    <li>
                      <p>
                        Combo: BB Royal Almond/Badam Californian, Extra Bold 100
                        gm...
                      </p>
                    </li>
                    <li>
                      <p>
                        combo: Royal Cashew Californian, Extra Bold 100 gm + BB
                        Royal Honey 500 gm
                      </p>
                    </li>
                  </ul>
                </div>

                <button
                  class="btn theme-bg-color text-white btn-md w-100 mt-4 fw-bold"
                  onClick={() => handlePlaceOrder()}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
