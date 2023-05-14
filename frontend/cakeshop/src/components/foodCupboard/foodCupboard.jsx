import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductCard } from "../commons/productCard/productCard";

import useFetch from "../../hooks/useFetch";
import { BiLeaf } from "react-icons/bi";
export const FoodCupboard = () => {
  const { data, loading, error, reFetch } = useFetch("/product");
  var settings = {
    dots: true,
    infinite: data.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div class="title d-block">
        <h2>Food Cupboard</h2>
        <span class="title-leaf">
          <BiLeaf class="icon-width" />
        </span>
        <p>A virtual assistant collects the products from your list</p>
      </div>

      <div class="product-border overflow-hidden wow fadeInUp">
        <div class="product-box-slider no-arrow">
          <Slider {...settings}>
            {data.length > 0 &&
              data.map((item, index) => (
                <div key={index}>
                  <div class="row m-0">
                    <div class="col-12 px-0">
                      <ProductCard id={item._id} />
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
