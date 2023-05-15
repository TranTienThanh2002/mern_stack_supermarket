import React, { useEffect, useState } from "react";
import { FiEye, FiHeart } from "react-icons/fi";
import { MdLoop } from "react-icons/md";
import { useQuickViewContext } from "../../../redux/contexts/quickViewContext/quickViewContext";
import { Link, useNavigate } from "react-router-dom";
import { useCompareContext } from "../../../redux/contexts/compareContext/compareContext";
import useFetch from "../../../hooks/useFetch";
import { useWishListContext } from "../../../redux/contexts/wishlistContext/wishlistContext";
import axios from "axios";
import { NotificationManager } from "react-notifications";
export const ProductImage = ({ imageUrl, id }) => {
  const { showQuickView } = useQuickViewContext();
  const { addToCompare } = useCompareContext();
  const { addWishlist } = useWishListContext();
  
  
  const navigate = useNavigate();
  const handleClick = () => {
    showQuickView(id, true);
  };
  const handleCompareClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://super-market-2ebn.onrender.com/api/product/${id}`
      );
      addToCompare(data);
      navigate("/compare");
      NotificationManager.success(
        "Add to compare success",
        "Compare products",
        2000
      );
    } catch (error) {
      NotificationManager.error(
        "Add to compare failed",
        "Compare products",
        2000
      );
      NotificationManager.error(
        error.message,
        "Compare products",
        2000
      );
    }
  };
  const handleWishlistClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://super-market-2ebn.onrender.com/api/product/${id}`
      );
      addWishlist(data);
      NotificationManager.success("Add to wishlist success", "Wishlist", 2000);
    } catch (error) {
      NotificationManager.success("Add to wishlist failed", "Wishlist", 2000);
      NotificationManager.error(error.message, "Wishlist", 2000);
    }
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
            onClick={(e) => handleCompareClick(e)}
          >
            <Link>
              <MdLoop />
            </Link>
          </li>

          <li
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Wishlist"
            onClick={(e) => handleWishlistClick(e)}
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
