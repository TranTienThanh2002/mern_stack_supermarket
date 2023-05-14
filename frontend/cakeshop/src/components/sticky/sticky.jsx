import React, { useEffect, useState } from "react";
import { CategoryMenu } from "../commons/categoryMenu/categoryMenu";
import { TrendingProductCard } from "../commons/trendingProductCard/trendingProductCard";
import banner8 from "../../assets/images/vegetable/banner/8.jpg";
import banner11 from "../../assets/images/vegetable/banner/11.jpg";
import axios from "axios";
import { useFillterProductContext } from "../../redux/contexts/filterProductContext/filterProductContext";
import { useNavigate } from "react-router-dom";
export const Sticky = () => {
  const [topSale, setTopSale] = useState([]);
  const getTopSales = async () => {
    const { data } = await axios.get("https://super-market-2ebn.onrender.com/api/product/get/productTopSales");
    setTopSale(data);
  };
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
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    getTopSales();
  }, []);
  return (
    <>
      <div class="p-sticky">
        <CategoryMenu />

        <div class="ratio_156 section-t-space">
          <div
            class="home-contain hover-effect"
            style={{
              "background-image": `url(${banner8})`,
              "background-size": "cover",
              "background-position": "center center",
              "background-repeat": "no-repeat",
              display: "block",
            }}
          >
            <img
              src={banner8}
              class="bg-img blur-up lazyload"
              alt=""
              style={{ display: "none" }}
            />
            <div class="home-detail p-top-left home-p-medium">
              <div>
                <h6 class="text-yellow home-banner">Seafood</h6>
                <h3 class="text-uppercase fw-normal">
                  <span class="theme-color fw-bold">Freshes</span> Products
                </h3>
                <h3 class="fw-light">every hour</h3>
                <button
                  onClick={(e)=>handleClickCategories(e,"meats")}
                  class="btn btn-animation btn-md mend-auto"
                >
                  Shop Now <i class="fa-solid fa-arrow-right icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="ratio_medium section-t-space">
          <div
            class="home-contain hover-effect"
            style={{
              "background-image": `url(${banner11})`,
              "background-size": "cover",
              "background-position": "center center",
              "background-repeat": "no-repeat",
              display: "block",
            }}
          >
            <img
              src={banner11}
              class="img-fluid blur-up lazyload"
              alt=""
              style={{ display: "none" }}
            />
            <div class="home-detail p-top-left home-p-medium">
              <div>
                <h4 class="text-yellow text-exo home-banner">Organic</h4>
                <h2 class="text-uppercase fw-normal mb-0 text-russo theme-color">
                  fresh
                </h2>
                <h2 class="text-uppercase fw-normal text-title">Vegetables</h2>
                <p class="mb-3">Super Offer to 50% Off</p>
                <button
                  onClick={(e)=>handleClickCategories(e, "vegetable")}
                  class="btn btn-animation btn-md mend-auto"
                >
                  Shop Now <i class="fa-solid fa-arrow-right icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {topSale.length > 0 && (
          <div class="section-t-space">
            <div class="category-menu">
              <h3>Trending Products</h3>

              <ul class="product-list border-0 p-0 d-block">
                {topSale.map((item, index) => (
                  <li
                    key={index}
                    className={index === topSale.length - 1 ? "mb-0" : ""}
                  >
                    <TrendingProductCard
                      imageUrl={item.photos[0]}
                      name={item.productname}
                      kilo={item.weight[0]}
                      price={item.discount}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        
      </div>
    </>
  );
};
