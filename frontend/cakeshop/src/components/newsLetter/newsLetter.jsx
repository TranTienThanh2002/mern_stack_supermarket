import React from "react";
import { FiMail } from "react-icons/fi";
export const NewsLetter = ({setLoading}) => {
  setLoading(true)
  return (
    <>
      <section class="newsletter-section section-b-space">
        <div class="container-fluid-lg">
          <div class="newsletter-box newsletter-box-2">
            <div class="newsletter-contain py-5">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-xxl-4 col-lg-5 col-md-7 col-sm-9 offset-xxl-2 offset-md-1">
                    <div class="newsletter-detail">
                      <h2>Join our newsletter and get...</h2>
                      <h5>$20 discount for your first order</h5>
                      <div class="input-box">
                        <input
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Your Email"
                        />

                        <div className="arrow">
                          <FiMail
                            style={{
                              
                              "background-color":
                                "rgba(var(--theme-color-rgb), 0.1)",
                              "font-size": "15px",
                              "margin": "8px",
                              "-webkit-text-stroke": "1px var(--theme-color)",
                              
                            }}
                          />
                        </div>
                        <button class="sub-btn  btn-animation">
                          <span class="d-sm-block d-none">Subscribe</span>
                          <i class="fa-solid fa-arrow-right icon"></i>
                        </button>
                      </div>
                    </div>
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
