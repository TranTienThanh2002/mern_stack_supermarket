import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import shop1 from "../../../assets/images/shop/1.jpg";

export const Poster = () => {
  var settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <section>
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <div class="slider-1 slider-animate product-wrapper no-arrow">
                <Slider {...settings}>
                  <div>
                    <div class="banner-contain-2 hover-effect" 
                    style={{
                        "background-image": `url(${shop1})`,
                        "background-size": "cover",
                        "background-position": "center center",
                        "background-repeat": "no-repeat",
                        display: "block",
                      }}>
                      <img
                        src={shop1}
                        class="bg-img rounded-3 blur-up lazyload"
                        alt=""
                        style={{ display: "none" }}
                      />
                      <div class="banner-detail p-center-right position-relative shop-banner ms-auto banner-small">
                        <div>
                          <h2>Healthy, nutritious & Tasty Fruits & Veggies</h2>
                          <h3>Save upto 50%</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="banner-contain-2 hover-effect"
                    style={{
                        "background-image": `url(${shop1})`,
                        "background-size": "cover",
                        "background-position": "center center",
                        "background-repeat": "no-repeat",
                        display: "block",
                      }}>
                      <img
                        src={shop1}
                        class="bg-img rounded-3 blur-up lazyload"
                        alt=""
                        style={{ display: "none" }}
                      />
                      <div class="banner-detail p-center-right position-relative shop-banner ms-auto banner-small">
                        <div>
                          <h2>Healthy, nutritious & Tasty Fruits & Veggies</h2>
                          <h3>Save upto 50%</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="banner-contain-2 hover-effect"
                    style={{
                        "background-image": `url(${shop1})`,
                        "background-size": "cover",
                        "background-position": "center center",
                        "background-repeat": "no-repeat",
                        display: "block",
                      }}>
                      <img
                        src={shop1}
                        class="bg-img rounded-3 blur-up lazyload"
                        alt=""
                        style={{ display: "none" }}
                      />
                      <div class="banner-detail p-center-right position-relative shop-banner ms-auto banner-small">
                        <div>
                          <h2>Healthy, nutritious & Tasty Fruits & Veggies</h2>
                          <h3>Save upto 50%</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
