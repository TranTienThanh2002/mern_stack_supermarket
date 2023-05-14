import React, { useEffect, useState } from "react";
import { FiEye, FiHeart } from "react-icons/fi";
import { MdLoop } from "react-icons/md";
import { useQuickViewContext } from "../../../redux/contexts/quickViewContext/quickViewContext";
import { Link, useNavigate } from "react-router-dom";
import { useCompareContext } from "../../../redux/contexts/compareContext/compareContext";
import useFetch from "../../../hooks/useFetch";
import { useWishListContext } from "../../../redux/contexts/wishlistContext/wishlistContext";
import axios from "axios";

export const ProductImage = ({ imageUrl, id }) => {
  const { showQuickView } = useQuickViewContext();
  const { addToCompare } = useCompareContext();
  const { addWishlist } = useWishListContext();
  
  
  const navigate = useNavigate();
  const handleClick = () => {
    showQuickView(id, true);
  };
  const handleCompareClick = async() => {
    const { data } = await axios.get(`/product/${id}`);
      addToCompare(data);
      navigate("/compare");
  };
  const handleWishlistClick = async() => {
    const { data } = await axios.get(`/product/${id}`);
    addWishlist(data);
  };

  return (
    <>
      <div class="product-image">
        <Link to={`/product/${id}`}>
          <img src={imageUrl} class="img-fluid blur-up lazyload" alt="" />
        </Link>
        <ul class="product-option">
          <li
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="View"
            onClick={handleClick}
          >
            <Link data-bs-toggle="modal" data-bs-target="#view">
              <FiEye />
            </Link>
          </li>

          <li
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Compare"
            onClick={() => handleCompareClick()}
          >
            <Link>
              <MdLoop />
            </Link>
          </li>

          <li
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Wishlist"
            onClick={() => handleWishlistClick()}
          >
            <Link class="notifi-wishlist">
              <FiHeart />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
