import React from "react";
import Slider from "react-slick";
import banner4 from "../../assets/images/vegetable/banner/4.jpg";
import banner5 from "../../assets/images/vegetable/banner/5.jpg";
import banner6 from "../../assets/images/vegetable/banner/6.jpg";
import banner7 from "../../assets/images/vegetable/banner/7.jpg";
import { BannerCard } from "../commons/bannerCard/bannerCard";
export const BannerSection = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
       
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              
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

  return (
    <>
      <section class="banner-section ratio_60 wow fadeInUp">
        <div class="container-fluid-lg">
          <div class="banner-slider product-wrapper">
          <Slider {...settings}>
            <div>
              <BannerCard
                banner={banner4}
                sale="5% OFF"
                title="Hot Deals on New Items"
                content="Daily Essentials Eggs & Dairy"
                category = "meats"
              />
            </div>

            <div>
              <BannerCard
                banner={banner5}
                sale="5% OFF"
                title="Buy More & Save More"
                content="Fresh Vegetables"
                category = "vegetable"
              />
            </div>

            <div>
              <BannerCard
                banner={banner6}
                sale="5% OFF"
                title="Organic Meat Prepared"
                content="Delivered to Your Home"
                category = "meats"
              />
            </div>

            <div>
              <BannerCard
                banner={banner7}
                sale="5% OFF"
                title="Buy More & Save More"
                content="Nuts & Snacks"
                category = "biscuits"
              />
            </div>
            </Slider>
          </div>
          
        </div>
        
      </section>
    </>
  );
};
