import React from "react";
import { BrowserCategory } from "../browserCategory/browserCategory";
import { Sticky } from "../sticky/sticky";
import { TopSaveToday } from "../topSaveToday/topSaveToday";
import banner9 from "../../assets/images/vegetable/banner/9.jpg";
import banner10 from "../../assets/images/vegetable/banner/10.jpg";
import { BannerCardMini } from "../commons/bannerCard/bannerCardMini";
import { FoodCupboard } from "../foodCupboard/foodCupboard";
import banner15 from "../../assets/images/vegetable/banner/15.jpg";
import banner12 from "../../assets/images/vegetable/banner/12.jpg";
import banner13 from "../../assets/images/vegetable/banner/13.jpg";
import banner14 from "../../assets/images/vegetable/banner/14.jpg";
import { OurBestSeller } from "../ourBestSeller/ourBestSeller";
import { MdArrowRightAlt } from "react-icons/md";
import { useFillterProductContext } from "../../redux/contexts/filterProductContext/filterProductContext";
import { Link, useNavigate } from "react-router-dom";

export const ProductSection = () => {
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
      <section class="product-section">
        <div class="container-fluid-lg">
          <div class="row g-sm-4 g-3">
            <div class="col-xxl-3 col-xl-4 d-none d-xl-block">
              <Sticky />
            </div>

            <div class="col-xxl-9 col-xl-8">
              <TopSaveToday />

              <BrowserCategory />

              <div class="section-t-space section-b-space">
                <div class="row g-md-4 g-3">
                  <div class="col-md-6">
                    <BannerCardMini
                      image={banner9}
                      title="Testy Mushrooms"
                      offer="50% offer"
                    />
                  </div>
                  <div class="col-md-6">
                    <BannerCardMini
                      image={banner10}
                      title="Fresh MEAT"
                      offer="50% offer"
                    />
                  </div>
                </div>
              </div>

              <FoodCupboard />

              <div class="section-t-space">
                <div class="banner-contain">
                  <img
                    src={banner15}
                    class="bg-img blur-up lazyload"
                    alt=""
                    style={{ display: "none" }}
                  />
                  <div
                    class="banner-details p-center p-4 text-white text-center"
                    style={{
                      "background-image": `url(${banner15})`,
                      "background-size": "cover",
                      "background-position": "center center",
                      "background-repeat": "no-repeat",
                      display: "block",
                    }}
                  >
                    <div>
                      <h3 class="lh-base fw-bold offer-text">
                        Get $3 Cashback! Min Order of $30
                      </h3>
                      <h6 class="coupon-code">Use Code : GROCERY1920</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div class="section-t-space section-b-space">
                <div class="row g-md-4 g-3">
                  <div class="col-xxl-8 col-xl-12 col-md-7">
                    <div class="banner-contain hover-effect">
                      <img
                        src={banner12}
                        class="bg-img blur-up lazyload"
                        alt=""
                        style={{ display: "none" }}
                      />
                      <div
                        class="banner-details p-center-left p-4"
                        style={{
                          "background-image": `url(${banner12})`,
                          "background-size": "cover",
                          "background-position": "center center",
                          "background-repeat": "no-repeat",
                          display: "block",
                        }}
                      >
                        <div>
                          <h2 class="text-kaushan fw-normal theme-color">
                            Get Ready To
                          </h2>
                          <h3 class="mt-2 mb-3">TAKE ON THE DAY!</h3>
                          <p class="text-content banner-text">
                            In publishing and graphic design, Lorem ipsum is a
                            placeholder text commonly used to demonstrate.
                          </p>
                          <button
                            onClick={(e)=>handleClickCategories(e,"beverage")}
                            class="btn btn-animation btn-sm mend-auto"
                          >
                            Shop Now{" "}
                            <MdArrowRightAlt/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xxl-4 col-xl-12 col-md-5">
                    <Link
                     onClick={(e)=>handleClickCategories(e,"beverage")}
                      class="banner-contain hover-effect h-100"
                    >
                      <img
                        src={banner13}
                        class="bg-img blur-up lazyload"
                        alt=""
                        style={{ display: "none" }}
                      />
                      <div
                        class="banner-details p-center-left p-4 h-100"
                        style={{
                          "background-image": `url(${banner13})`,
                          "background-size": "cover",
                          "background-position": "center center",
                          "background-repeat": "no-repeat",
                          display: "block",
                        }}
                      >
                        <div>
                          <h2 class="text-kaushan fw-normal text-danger">
                            20% Off
                          </h2>
                          <h3 class="mt-2 mb-2 theme-color">SUMMRY</h3>
                          <h3 class="fw-normal product-name text-title">
                            Product
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <OurBestSeller />

              <div class="section-t-space">
                <div class="banner-contain hover-effect">
                  <img
                    src={banner14}
                    class="bg-img blur-up lazyload"
                    alt=""
                    style={{ display: "none" }}
                  />
                  <div class="banner-details p-center banner-b-space w-100 text-center"
                  style={{
                    "background-image": `url(${banner14})`,
                    "background-size": "cover",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    display: "block",
                  }}>
                    <div>
                      <h6 class="ls-expanded theme-color mb-sm-3 mb-1">
                        SUMMER
                      </h6>
                      <h2 class="banner-title">VEGETABLE</h2>
                      <h5 class="lh-sm mx-auto mt-1 text-content">
                        Save up to 5% OFF
                      </h5>
                      <button
                        onClick={(e)=>handleClickCategories(e,"vegetable")}
                        class="btn btn-animation btn-sm mx-auto mt-sm-3 mt-2"
                      >
                        Shop Now <MdArrowRightAlt/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <FeatureBlog /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
