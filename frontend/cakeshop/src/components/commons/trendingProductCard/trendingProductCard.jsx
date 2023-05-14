import React from "react";
import { Link } from "react-router-dom";

export const TrendingProductCard = ({imageUrl, name, kilo, price,id}) => {
  return (
    <>
      <div class="offer-product">
        <Link to={`/product/${id}`} class="offer-image">
          <img
            src={imageUrl}
            class="blur-up lazyload"
            alt=""
          />
        </Link>

        <div class="offer-detail">
          <div>
            <Link to={`/product/${id}`} class="text-title">
              <h6 class="name">{name}</h6>
            </Link>
            <span>{kilo}</span>
            <h6 class="price theme-color">$ {price}</h6>
          </div>
        </div>
      </div>
    </>
  );
};
