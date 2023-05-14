import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ProductImage } from "../commons/productCard/productImage";
import { ProductDetails } from "../commons/productCard/productDetails";
import axios from "axios";
export const RelateProduct = ({ tag }) => {
  const [data, setData] = useState([]);
  var settings = {
    dots: true,
    infinite: data.length> 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          
        }
      }
    ]
  };
  const getRelateProduct = async () => {
    const tags = {
      tags: tag,
    };
    const { data } = await axios.post("https://super-market-2ebn.onrender.com/api/product/relateProduct", tags);
    setData(data);
  };
  useEffect(() => {
    getRelateProduct();
  }, []);
  return (
    <>
      {data.length > 0 && (
        <section class="product-list-section section-b-space relate-product">
          <div class="container-fluid-lg">
            <div class="title">
              <h2>Related Products</h2>
              <span class="title-leaf">
                <svg class="icon-width">
                  <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
                </svg>
              </span>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="slider-6_1 product-wrapper">
                  <Slider {...settings}>
                    {data.map((item, index) => (
                      <div key={index}>
                        <div class="product-box-3 wow fadeInUp">
                          <div class="product-header">
                            <ProductImage imageUrl={item.photos[0]} id= {item.id}/>
                          </div>
                          <div class="product-footer">
                            <ProductDetails
                            item={item}
                              spanName={item.tags[0]}
                              name={item.productname}
                              priceNew={item.discount}
                              priceOld={item.price}
                              unit={item.weight[0]}
                              background="bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
