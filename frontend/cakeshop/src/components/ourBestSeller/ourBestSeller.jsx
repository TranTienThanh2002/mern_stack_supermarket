import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { TrendingProductCard } from "../commons/trendingProductCard/trendingProductCard";
import { BiLeaf } from "react-icons/bi";
import useFetch from "../../hooks/useFetch";
export const OurBestSeller = () => {
  const { data } = useFetch(`/product/get/productTopSales/limit/12`);
  var settings = {
    dots: true,
    infinite: data.length > 4,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {data.length > 0 && (
        <>
          <div class="title d-block">
            <div>
              <h2>Our best Seller</h2>
              <span class="title-leaf">
                <BiLeaf class="icon-width" />
              </span>
              <p>A virtual assistant collects the products from your list</p>
            </div>
          </div>

          <div class="best-selling-slider product-wrapper wow fadeInUp">
            <Slider {...settings}>
              <div>
                <ul class="product-list">
                  {data.slice(0, 4).map((item, index) => (
                    <li key={index}>
                      <TrendingProductCard
                        id={item._id}
                        imageUrl={item.photos[0]}
                        name={item.productname}
                        kilo={item.weight[0]}
                        price={item.discount}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul class="product-list">
                  {data.slice(4, 8).map((item, index) => (
                    <li key={index}>
                      <TrendingProductCard
                        id={item._id}
                        imageUrl={item.photos[0]}
                        name={item.productname}
                        kilo={item.weight[0]}
                        price={item.discount}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul class="product-list">
                  {data.slice(8, 12).map((item, index) => (
                    <li key={index}>
                      <TrendingProductCard
                        id={item._id}
                        imageUrl={item.photos[0]}
                        name={item.productname}
                        kilo={item.weight[0]}
                        price={item.discount}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Slider>
          </div>
        </>
      )}
    </>
  );
};
