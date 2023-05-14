import React from "react";

import Slider from "react-slick";
import blog1 from "../../assets/images/vegetable/blog/1.jpg";
import blog2 from "../../assets/images/vegetable/blog/2.jpg";
import blog3 from "../../assets/images/vegetable/blog/3.jpg";
import { BlogCardMini } from "../commons/blogCardMini/blogCardMini";
export const FeatureBlog = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <>
      <div class="title section-t-space">
        <h2>Featured Blog</h2>
        <span class="title-leaf">
          <svg class="icon-width">
            <use href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
          </svg>
        </span>
        <p>A virtual assistant collects the products from your list</p>
      </div>

      <div class="slider-3-blog ratio_65 no-arrow product-wrapper">
        <Slider {...settings}>
          <BlogCardMini
            image={blog1}
            date="20 March, 2022"
            title="Fresh Vegetable Online"
          />
          <BlogCardMini
            image={blog2}
            date="10 April, 2022"
            title="Fresh Combo Fruit"
          />
          <BlogCardMini
            image={blog3}
            date="10 April, 2022"
            title="Nuts to Eat for Better Health"
          />
          <BlogCardMini
            image={blog1}
            date="20 March, 2022"
            title="Fresh Vegetable Online"
          />
        </Slider>
      </div>
    </>
  );
};
