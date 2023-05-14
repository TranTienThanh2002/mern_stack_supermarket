import React from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import contact from "../../assets/images/inner-page/contact-us.png";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdMessage, MdPhoneIphone } from "react-icons/md";
import { BsFillBuildingFill } from "react-icons/bs";
export const Contact = () => {
  return (
    <>
      <BreadCrumb title="Contact Us" />
      <section class="contact-box-section">
        <div class="container-fluid-lg">
          <div class="row g-lg-5 g-3">
            <div class="col-lg-6">
              <div class="left-sidebar-box">
                <div class="row">
                  <div class="col-xl-12">
                    <div class="contact-image">
                      <img
                        src={contact}
                        class="img-fluid blur-up lazyloaded"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="col-xl-12">
                    <div class="contact-title">
                      <h3>Get In Touch</h3>
                    </div>

                    <div class="contact-detail">
                      <div class="row g-4">
                        <div class="col-xxl-6 col-lg-12 col-sm-6">
                          <div class="contact-detail-box">
                            <div class="contact-icon">
                              <FaPhoneAlt className="icon"/>
                            </div>
                            <div class="contact-detail-title">
                              <h4>Phone</h4>
                            </div>

                            <div class="contact-detail-contain">
                              <p>(+84) 12345689</p>
                            </div>
                          </div>
                        </div>

                        <div class="col-xxl-6 col-lg-12 col-sm-6">
                          <div class="contact-detail-box">
                            <div class="contact-icon">
                            <MdEmail className="icon"/>
                            </div>
                            <div class="contact-detail-title">
                              <h4>Email</h4>
                            </div>

                            <div class="contact-detail-contain">
                              <p>trantienthanhK18.062@gmail.com</p>
                            </div>
                          </div>
                        </div>

                        <div class="col-xxl-6 col-lg-12 col-sm-6">
                          <div class="contact-detail-box">
                            <div class="contact-icon">
                              <MdLocationOn className="icon"/>
                            </div>
                            <div class="contact-detail-title">
                              <h4>HCM Office</h4>
                            </div>

                            <div class="contact-detail-contain">
                              <p>Thu duc - Tp.Hcm</p>
                            </div>
                          </div>
                        </div>

                        <div class="col-xxl-6 col-lg-12 col-sm-6">
                          <div class="contact-detail-box">
                            <div class="contact-icon">
                              <BsFillBuildingFill className="icon"/>
                            </div>
                            <div class="contact-detail-title">
                              <h4>PhuQuy Office</h4>
                            </div>

                            <div class="contact-detail-contain">
                              <p>Phu quy binh thuan </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="title d-xxl-none d-block">
                <h2>Contact Us</h2>
              </div>
              <div class="right-sidebar-box">
                <div class="row">
                  <div class="col-xxl-6 col-lg-12 col-sm-6">
                    <div class="mb-md-4 mb-3 custom-form">
                      <label for="exampleFormControlInput" class="form-label">
                        
                        First Name
                      </label>
                      <div class="custom-input">
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput"
                          placeholder="Enter First Name"
                        />
                        <FaUser className="icon"/>
                      </div>
                    </div>
                  </div>

                  <div class="col-xxl-6 col-lg-12 col-sm-6">
                    <div class="mb-md-4 mb-3 custom-form">
                      <label for="exampleFormControlInput1" class="form-label">
                        Last Name
                      </label>
                      <div class="custom-input">
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Last Name"
                        />
                        <FaUser className="icon"/>
                      </div>
                    </div>
                  </div>

                  <div class="col-xxl-6 col-lg-12 col-sm-6">
                    <div class="mb-md-4 mb-3 custom-form">
                      <label for="exampleFormControlInput2" class="form-label">
                        Email Address
                      </label>
                      <div class="custom-input">
                        <input
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput2"
                          placeholder="Enter Email Address"
                        />
                        <MdEmail className="icon"/>
                      </div>
                    </div>
                  </div>

                  <div class="col-xxl-6 col-lg-12 col-sm-6">
                    <div class="mb-md-4 mb-3 custom-form">
                      <label for="exampleFormControlInput3" class="form-label">
                        Phone Number
                      </label>
                      <div class="custom-input">
                        <input
                          type="tel"
                          class="form-control"
                          id="exampleFormControlInput3"
                          placeholder="Enter Your Phone Number"
                          maxlength="10"
                          oninput="javascript: if (this.value.length > this.maxLength) this.value =
                                            this.value.slice(0, this.maxLength);"
                        />
                        <MdPhoneIphone className="icon"/>
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="mb-md-4 mb-3 custom-form">
                      <label
                        for="exampleFormControlTextarea"
                        class="form-label"
                      >
                        Message
                      </label>
                      <div class="custom-textarea">
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea"
                          placeholder="Enter Your Message"
                          rows="6"
                        ></textarea>
                       <MdMessage className="icon"/>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-animation btn-md fw-bold ms-auto">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
};
