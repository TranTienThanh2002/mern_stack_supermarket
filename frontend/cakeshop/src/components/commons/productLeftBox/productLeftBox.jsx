import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const url = "../../../assets/images/product/category/";
//data is url image
export const ProductLeftBox = ({ data }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });
  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    // asNavFor: '.slider-nav'
  };
  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    // asNavFor: '.slider-for',
    infinite: data.length > 4,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    // rightPadding: '10px',
    vertical: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          vertical: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          vertical: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          vertical: false,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          vertical: false,
          centerMode: true,
        },
      },
    ],
  };
  return (
    <>
      <div class="product-left-box">
        <div class="row ">
          <div class="col-xxl-10 col-lg-12 col-md-12 order-xxl-2 order-lg-1 order-md-1">
            <div class="product-main-2 no-arrow">
              <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={(slider) => setSlider1(slider)}
              >
                {data.map((photo) => (
                  <div class="slider-image">
                    <img
                      src={photo}
                      id="img-1"
                      data-zoom-image={photo}
                      class="img-fluid image_zoom_cls-0 blur-up lazyload"
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div class="col-xxl-2 col-lg-12 col-md-12 order-xxl-1 order-lg-2 order-md-2">
            <div class="left-slider-image-2 left-slider no-arrow slick-top">
              <Slider
                {...settingsThumbs}
                asNavFor={nav1}
                ref={(slider) => setSlider2(slider)}
              >
                {data.map((photo) => (
                  <div class="slider-image">
                    <img
                      src={photo}
                      id="img-1"
                      data-zoom-image={photo}
                      class="img-fluid image_zoom_cls-0 blur-up lazyload"
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
