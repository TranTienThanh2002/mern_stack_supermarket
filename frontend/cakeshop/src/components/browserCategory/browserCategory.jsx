import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Slider from "react-slick";
import { useFillterProductContext } from "../../redux/contexts/filterProductContext/filterProductContext";
import { BiLeaf } from "react-icons/bi";
export const BrowserCategory = () => {
  var settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 2000,
    responsive: [
      
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          
        }
      }
    ]
  };
  const { addTag, tags, removeTag } = useFillterProductContext();
  const navigate = useNavigate();
  const handleClickCategories = (e, category) => {
    e.preventDefault();
    if (tags.length > 0) {
      tags.map((item) => removeTag(item));
    }
    addTag(category);
    navigate("/shop");
  };
  return (
    <>
      <div class="title">
        <h2>Bowse by Categories</h2>
        <span class="title-leaf">
        <BiLeaf class="icon-width"/>
        </span>
        <p>Top Categories Of The Week</p>
      </div>

      <div class="category-slider-2 product-wrapper no-arrow">
        <Slider {...settings}>
          <div>
            <Link
              onClick={(e) => handleClickCategories(e, "vegetable")}
              class="category-box category-dark"
            >
              <div>
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/svg/1/vegetable.svg"
                  class="blur-up lazyload"
                  alt=""
                />
                <h5>Vegetables & Fruit</h5>
              </div>
            </Link>
          </div>

          <div>
            <Link
              onClick={(e) => handleClickCategories(e, "beverage")}
              class="category-box category-dark"
            >
              <div>
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/svg/1/cup.svg"
                  class="blur-up lazyload"
                  alt=""
                />
                <h5>Beverages</h5>
              </div>
            </Link>
          </div>

          <div>
            <Link
              onClick={(e) => handleClickCategories(e, "meats")}
              class="category-box category-dark"
            >
              <div>
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/svg/1/meats.svg"
                  class="blur-up lazyload"
                  alt=""
                />
                <h5>Meats & Seafood</h5>
              </div>
            </Link>
          </div>

          <div>
            <Link
              onClick={(e) => handleClickCategories(e, "breakfast")}
              class="category-box category-dark"
            >
              <div>
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/svg/1/breakfast.svg"
                  class="blur-up lazyload"
                  alt=""
                />
                <h5>Breakfast</h5>
              </div>
            </Link>
          </div>

          <div>
            <Link
              onClick={(e) => handleClickCategories(e, "frozen")}
              class="category-box category-dark"
            >
              <div>
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/svg/1/frozen.svg"
                  class="blur-up lazyload"
                  alt=""
                />
                <h5>Frozen Foods</h5>
              </div>
            </Link>
          </div>

          <div>
            <Link
              onClick={(e) => handleClickCategories(e, "milk")}
              class="category-box category-dark"
            >
              <div>
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/svg/1/milk.svg"
                  class="blur-up lazyload"
                  alt=""
                />
                <h5>Milk & Dairies</h5>
              </div>
            </Link>
          </div>

          <div>
            <Link
              onClick={(e) => handleClickCategories(e, "pet")}
              class="category-box category-dark"
            >
              <div>
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/svg/1/pet.svg"
                  class="blur-up lazyload"
                  alt=""
                />
                <h5>Pet Food</h5>
              </div>
            </Link>
          </div>
        </Slider>
      </div>
    </>
  );
};
