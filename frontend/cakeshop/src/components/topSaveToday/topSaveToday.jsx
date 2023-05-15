import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import { ProductCard } from "../commons/productCard/productCard";
import useFetch from "../../hooks/useFetch";
import { BiLeaf } from "react-icons/bi";
export const TopSaveToday = () => {
  const [items, setItems] = useState([]);
  const { data, loading, error, reFetch } = useFetch("https://super-market-2ebn.onrender.com/api/product");
  var settings = {
    dots: true,
    infinite: items.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,

    centerMode: false,
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
  useEffect(() => {
    const item = data.reduce((result, item, index) => {
      if (index % 2 === 0) {
        result.push(data.slice(index, index + 2));
      }
      return result;
    }, []);
    setItems(item);
  }, [loading]);
  return (
    <>
      <div class="title title-flex">
        <div>
          <h2>Top Save Today</h2>
          <span class="title-leaf">
            <BiLeaf class="icon-width" />
          </span>
          <p>
            Don't miss this opportunity at a special discount just for this
            week.
          </p>
        </div>
      </div>

      <div class="section-b-space">
        <div class="product-border border-row overflow-hidden">
          <div class="product-box-slider no-arrow">
            <Slider {...settings}>
              {items.length > 0 &&
                items.map((item, index) => (
                  <div key={index}>
                    <div class="row m-0">
                      <div class="col-12 px-0" id={index}>
                        <ProductCard id={item[0]._id} />
                      </div>
                      {(index + 1) * 2 <= data.length && (
                        <div class="col-12 px-0">
                          <ProductCard id={item[1]._id} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};
