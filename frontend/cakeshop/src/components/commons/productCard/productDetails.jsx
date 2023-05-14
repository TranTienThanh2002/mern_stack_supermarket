import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Rating from "@mui/material/Rating";
import { useCartContext } from "../../../redux/contexts/cartContexts/cartContext";
import { Link } from "react-router-dom";
import axios from "axios";

export const ProductDetails = ({ item, spanName, unit, background }) => {
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const handleShowQuantity = () => {
    setShowQuantity(true);
  };
  const { addToCart } = useCartContext();
  const getRating = async () => {
    var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/comment/getAllComment/${item._id}`);
    let all = data.length;
    if (data.length === 0) {
      all=1;
    }
    var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/comment/getRatingComment/${item._id}/1`);
      const one = data.length;
      var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/comment/getRatingComment/${item._id}/2`);
      const two = data.length;
      var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/comment/getRatingComment/${item._id}/3`);
      const three = data.length;
      var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/comment/getRatingComment/${item._id}/4`);
      const four = data.length;
      var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/comment/getRatingComment/${item._id}/5`);
      const five = data.length;
      const average = (
        (one + two * 2 + three * 3 + four * 4 + five * 5) /
        all
      ).toFixed(1);
      setAverageRating(average);
    
  };
  useEffect(() => {
    getRating();
  },[])
  useEffect(() => {
    if (showQuantity) {
      addToCart(item._id, item.weight[0], quantity, item);
    }
  }, [quantity]);
  return (
    <>
      {item && (
        <div class="product-detail">
          {spanName && (
            <>
              <span class="span-name">{spanName}</span>
            </>
          )}
          <Link to={`/product/${item._id}`}>
            <h6 class="name">{item.productname}</h6>
          </Link>
          {unit && (
            <>
              <h6 class="unit">{unit} ml</h6>
            </>
          )}
          <h5 class="sold text-content price">
            <span class="theme-color price">${item.discount}</span>
            <del>${item.price}</del>
          </h5>

          <div class="product-rating mt-sm-2 mt-1">
            <Rating
              name="half-rating-read"
              defaultValue={parseInt(averageRating)}
              value={parseInt(averageRating)}
              readOnly
              size="small"
            />

            <h6 class="theme-color">
              {item.qualified > 2 ? "In Stock" : "Out Stock"}
            </h6>
          </div>

          <div
            class={
              background ? `add-to-cart-box ${background}` : "add-to-cart-box "
            }
          >
            <button
              class="btn btn-add-cart addcart-button"
              onClick={handleShowQuantity}
            >
              Add
              <span class="add-icon">
                <FiPlus />
              </span>
            </button>
            <div class={`cart_qty qty-box ${showQuantity ? "open" : ""}`}>
              <div class="input-group">
                <button
                  type="button"
                  class="qty-left-minus"
                  data-type="minus"
                  data-field=""
                  onClick={() =>
                    (quantity !== 0 && setQuantity(quantity - 1)) ||
                    (quantity < 2 && setShowQuantity(false), setQuantity(1))
                  }
                >
                  <FiMinus />
                </button>
                <input
                  class="form-control input-number qty-input"
                  type="text"
                  name="quantity"
                  value={quantity}
                  defaultValue={quantity}
                  onChange={(e) =>
                    quantity < item.qualified &&
                    setQuantity(Number(e.target.value))
                  }
                />
                <button
                  type="button"
                  class="qty-right-plus"
                  data-type="plus"
                  data-field=""
                  onClick={() =>
                    quantity < item.qualified && setQuantity(quantity + 1)
                  }
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
