import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import banner1 from "../../assets/images/vegetable/banner/1.jpg";
import banner2 from "../../assets/images/vegetable/banner/2.jpg";
import banner3 from "../../assets/images/vegetable/banner/3.jpg";
import { useFillterProductContext } from "../../redux/contexts/filterProductContext/filterProductContext";
import { Link, useNavigate } from "react-router-dom";
export const HomeSection = () => {
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
      <section class="home-section pt-2">
        <div class="container-fluid-lg">
          <div class="row g-4">
            <div class="col-xl-8 ratio_65">
              <div class="home-contain h-100">
                <div
                  class="h-100 bg-size"
                  style={{
                    "background-image": `url(${banner1})`,
                    "background-size": "cover",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    display: "block",
                  }}
                >
                  <img
                    src={banner1}
                    class="bg-img blur-up lazyload"
                    alt=""
                    style={{ display: "none" }}
                  />
                </div>
                <div class="home-detail p-center-left w-75">
                  <div>
                    <h6>
                      Exclusive offer <span>30% Off</span>
                    </h6>
                    <h1 class="text-uppercase">
                      Stay home & delivered your{" "}
                      <span class="daily">Daily Needs</span>
                    </h1>
                    <p class="w-75 d-none d-sm-block">
                      Vegetables contain many vitamins and minerals that are
                      good for your health.
                    </p>
                    <button
                     onClick={(e)=>handleClickCategories(e, "vegetable")}
                      class="btn btn-animation mt-xxl-4 mt-2 home-button mend-auto"
                    >
                      Shop Now <MdArrowRightAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4 ratio_65">
              <div class="row g-4">
                <div class="col-xl-12 col-md-6">
                  <div
                    class="home-contain bg-size"
                    style={{
                      "background-image": `url(${banner2})`,
                      "background-size": "cover",
                      "background-position": "center center",
                      "background-repeat": "no-repeat",
                      display: "block",
                    }}
                  >
                    <img
                      src={banner2}
                      class="bg-img blur-up lazyload"
                      alt=""
                      style={{ display: "none" }}
                    />
                    <div class="home-detail p-center-left home-p-sm w-75">
                      <div>
                        <h2 class="mt-0 text-danger">
                          45% <span class="discount text-title">OFF</span>
                        </h2>
                        <h3 class="theme-color">Nut Collection</h3>
                        <p class="w-75">
                          We deliver organic vegetables & fruits
                        </p>
                        <Link onClick={(e)=>handleClickCategories(e,"biscuits")} class="shop-button">
                          Shop Now <MdArrowRightAlt />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-12 col-md-6">
                  <div
                    class="home-contain bg-size"
                    style={{
                      "background-image": `url(${banner3})`,
                      "background-size": "cover",
                      "background-position": "center center",
                      "background-repeat": "no-repeat",
                      display: "block",
                    }}
                  >
                    <img
                      src={banner3}
                      class="bg-img blur-up lazyload"
                      alt=""
                      style={{ display: "none" }}
                    />
                    <div class="home-detail p-center-left home-p-sm w-75">
                      <div>
                        <h3 class="mt-0 theme-color fw-bold">Healthy Food</h3>
                        <h4 class="text-danger">Organic Market</h4>
                        <p class="organic">
                          Start your daily shopping with some Organic food
                        </p>
                        <Link onClick={(e)=>handleClickCategories(e,"meats")} class="shop-button">
                          Shop Now <MdArrowRightAlt />
                        </Link>
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
