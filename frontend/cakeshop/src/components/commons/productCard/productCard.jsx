import React from "react";
import { ProductDetails } from "./productDetails";

import { ProductImage } from "./productImage";
import useFetch from "../../../hooks/useFetch";
export const ProductCard = ({ id }) => {
  const { data, loading, error } = useFetch(`/product/${id}`);
  return (
    <>
      {data.hasOwnProperty("productname") && (
        <div class="product-box">
          {/* {news && (
          <div class="label-tag">
            <span>{news}</span>
          </div>
        )} */}

          <ProductImage imageUrl={data.photos[0]} id={data._id}/>
          <ProductDetails item={data} />
        </div>
      )}
    </>
  );
};
