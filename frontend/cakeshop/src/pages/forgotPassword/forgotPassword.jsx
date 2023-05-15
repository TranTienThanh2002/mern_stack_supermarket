import React, { useState } from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import forgot from "../../assets/images/inner-page/forgot.png";
import axios from "axios";
import { NotificationManager } from "react-notifications";
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`https://super-market-2ebn.onrender.com/api/users/reset/${email}`);
    NotificationManager.success(
      "Send email successfully!",
      "ForgotPassword",
      2000
    );
    setMessage("Send email successfully!")
    } catch (error) {
      NotificationManager.error(
        "Send email failed!",
        "ForgotPassword",
        2000
      );
      setMessage("Check your email address!")
    }
    
  };
  return (
    <>
      <BreadCrumb title="Forgot Password" />
      <section class="log-in-section section-b-space forgot-section">
        <div class="container-fluid-lg w-100">
          <div class="row">
            <div class="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div class="image-contain">
                <img src={forgot} class="img-fluid" alt="" />
              </div>
            </div>

            <div class="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div class="d-flex align-items-center justify-content-center h-100">
                <div class="log-in-box">
                  <div class="log-in-title">
                    <h3>Welcome To Fastkart</h3>
                    {message === "" ? (
                    <h4>Forgot Password</h4>
                  ) : (
                    <h4 style={{ color: "red" }}>{message}*</h4>
                  )}
                  </div>

                  <div class="input-box">
                    <form class="row g-4">
                      <div class="col-12">
                        <div class="form-floating theme-form-floating log-in-form">
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label for="email">Email Address</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <button
                          class="btn btn-animation w-100"
                          onClick={(e) => handleClick(e)}
                        >
                          Forgot Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
