import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { BsBox } from "react-icons/bs";
import { Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { usePaginationOfSellerContext } from "../../redux/contexts/paginationOfSeller/paginationOfSeller";
import axios from "axios";
import { PaginationBasic } from "../../components/pagination/paginationOfSeller";

export const UserOrders = () => {
  const [datas, setDatas] = useState([]);
  const [allCart, setAllCart] = useState([]);
  const email = localStorage.getItem("users");
  const { page, limit, setPage } = usePaginationOfSellerContext();
  const navigate = useNavigate();
  const handleClickSeeCart = (id) => {
    navigate(`/orderSuccess/${id}`);
  };
  const refetchAllCart = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = await axios.get(`/cart/getAllCartByUser/${email}`);
    setAllCart(data);
  };
  useEffect(() => {
    refetchAllCart();
  }, []);
  useEffect(() => {
    const getAllCart = async () => {
      let fillerCart = {
        page: page,
        limit: limit,
        email: email
      };
      const { data } = await axios.post("/cart/getPageCartByEmail", fillerCart);
      setDatas(data);
    };
    getAllCart();
  }, [page]);
  return (
    <>
      <div
        class="tab-pane fade show"
        id="pills-order"
        role="tabpanel"
        aria-labelledby="pills-order-tab"
      >
        <div class="dashboard-order">
          <div class="title">
            <h2>My Orders History</h2>
            <span class="title-leaf title-leaf-gray">
              <svg class="icon-width bg-gray">
                <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
              </svg>
            </span>
          </div>

          <div class="order-contain">
            {datas?.length > 0 && (
              <>
                {datas.map((items) => (
                  <div class="order-box dashboard-bg-box">
                    <div class="order-container">
                      <div class="order-icon">
                        <BsBox className="icon" />
                      </div>

                      <div
                        class="order-detail"
                        onClick={() => handleClickSeeCart(items._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <h4>
                          Delivere{" "}
                          <span
                            className={
                              items.status === "SUCCESS" ? "success-bg" : ""
                            }
                          >
                            {items.status}
                          </span>
                        </h4>
                        <h6 class="text-content">
                          <strong>#{items._id.slice(-6)}</strong>
                        </h6>
                      </div>
                    </div>

                    {JSON.parse(items.productInCart).map((item, index) => (
                      <div class="product-order-detail" key={index}>
                        <Link to={`/product/${item.id}`} class="order-image">
                          <img
                            src={item.product.photos[0]}
                            class="blur-up lazyload"
                            alt=""
                          />
                        </Link>

                        <div class="order-wrap">
                          <a href="product-left-thumbnail.html">
                            <h3>{item.product.productname}</h3>
                          </a>
                          {/* <p class="text-content">
                      Cheddar dolcelatte gouda. Macaroni cheese cheese
                      strings feta halloumi cottage cheese jarlsberg
                      cheese triangles say cheese.
                    </p> */}
                          <ul class="product-size">
                            <li>
                              <div class="size-box">
                                <h6 class="text-content">Price : </h6>
                                <h5>${item.product.discount}</h5>
                              </div>
                            </li>

                            <li>
                              <div class="size-box">
                                <h6 class="text-content">Rate : </h6>
                                <div class="product-rating ms-2">
                                  <Rating
                                    name="rating"
                                    defaultValue={4}
                                    readOnly
                                    size="small"
                                  />
                                </div>
                              </div>
                            </li>

                            {/* <li>
                        <div class="size-box">
                          <h6 class="text-content">Sold By : </h6>
                          <h5>Fresho</h5>
                        </div>
                      </li> */}

                            <li>
                              <div class="size-box">
                                <h6 class="text-content">Quantity : </h6>
                                <h5>{item.product.weight[0]}</h5>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>

          {datas.length > 0 && (
            <PaginationBasic data={allCart} setPage={setPage} limit={limit} />
          )}
        </div>
      </div>
    </>
  );
};
