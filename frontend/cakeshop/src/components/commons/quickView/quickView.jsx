import React from "react";
import { useQuickViewContext } from "../../../redux/contexts/quickViewContext/quickViewContext";
import useFetch from "../../../hooks/useFetch";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

export const QuickView = () => {
  const { id, quickView, showQuickView } = useQuickViewContext();
  const { data, loading, error } = useFetch(`https://super-market-2ebn.onrender.com/api/product/${id}`);
  const navigate = useNavigate();
  const handleClick = () => {
    showQuickView(id, false)
    navigate(`/product/${id}`);
  };
  return (
    <>
      <div
        class={`modal fade theme-modal view-modal ${quickView ? "show" : ""}`}
        id="view"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div class="modal-content">
            <div class="modal-header p-0">
              <button
                type="button"
                class="btn-close btn-close-addProduct"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>showQuickView(id, false)}
              >
                 <MdClose class="icons" />
              </button>
            </div>
            <div class="modal-body">
              <div class="row g-sm-4 g-2">
                {data.hasOwnProperty("productname") && (
                  <>
                    <div class="col-lg-6">
                      <div class="slider-image">
                        <img
                          src={data.photos[0]}
                          class="img-fluid blur-up lazyload"
                          alt=""
                        />
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="right-sidebar-modal">
                        <h4 class="title-name">{data.productname}</h4>
                        <h4 class="price">${data.discount}</h4>
                        {/* <div class="product-rating">
                          <Rating
                            name="half-rating-read"
                            defaultValue={4}
                            value={4}
                            readOnly
                            size="small"
                          />
                          <span class="ms-2">8 Reviews</span>
                          <span class="ms-2 text-danger">
                            6 sold in last 16 hours
                          </span>
                        </div> */}

                        <div class="product-detail">
                          <h4>Product Details :</h4>
                          <p>{data.sortdesc}</p>
                        </div>

                        

                        <div class="select-size">
                          <h4>Cake Size :</h4>
                          <select class="form-select select-form-size">
                            <option selected>Select Size</option>
                            {data.weight.map((item, i) => (
                              <option value={item} key={i}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div class="modal-button">
                          {/* <button
                            onclick="location.href = 'cart.html';"
                            class="btn btn-md add-cart-button icon"
                          >
                            Add To Cart
                          </button> */}
                          <button
                            onClick={handleClick}
                            class="btn theme-bg-color view-button icon text-white fw-bold btn-md"
                          >
                            View More Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class={`modal-backdrop fade ${quickView ? "show" : ""}`}></div>
    </>
  );
};
