import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePaginationOfSellerContext } from "../../redux/contexts/paginationOfSeller/paginationOfSeller";
import { PaginationBasic } from "../../components/pagination/paginationOfSeller";

export const Orders = () => {
  const [datas, setDatas] = useState([]);
  const [allCart, setAllCart] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const { page, limit, setPage } = usePaginationOfSellerContext();
  const navigate = useNavigate()
  const config = {
    headers: {
      "Content-Type": "application/json",
      X_authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
  const handleClickSeeCart = (id)=>{
    navigate(`/orderSuccess/${id}`);
  }
  const refetchAllCart = async () => {
    const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/cart/getAllCart/`,config);
    setAllCart(data);
  };
  const refetchAllCartByKeySearch = async () => {
    let fillerCart = {
      page: page,
      limit: limit,
      key: keySearch,
    };
    const { data } = await axios.post(`https://super-market-2ebn.onrender.com/api/cart/getAllCartByKeySearch/`,fillerCart);
    setAllCart(data);
  };
  const handleSearchKey = (key) => {
    setKeySearch(key);
  };
  useEffect(() => {
    refetchAllCart();
  }, []);
  useEffect(() => {
   
    if(keySearch === ""){
      refetchAllCart();
    }
    else{
      refetchAllCartByKeySearch();
    }
  }, [keySearch]);
  useEffect(() => {
    const getAllCart = async () => {
      let fillerCart = {
        page: page,
        limit: limit,
        key: keySearch,
      };
      const { data } = await axios.post("https://super-market-2ebn.onrender.com/api/cart/getPageCart", fillerCart,config);
      setDatas(data);
    };
    getAllCart();
  }, [page, keySearch]);

  return (
    <>
      <div
        class="tab-pane fade show active"
        id="pills-order"
        role="tabpanel"
        aria-labelledby="pills-order-tab"
      >
        <div class="dashboard-order">
          <div class="title">
            <h2>All Order</h2>
            <span class="title-leaf title-leaf-gray">
              <svg class="icon-width bg-gray">
                <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
              </svg>
            </span>
          </div>
          <div class="input-group">
            <input
              type="search"
              class="form-control"
              placeholder="I'm searching for..."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => handleSearchKey(e.target.value)}
            />
          </div>
          {datas.length > 0 && (
            <>
              <div class="order-tab dashboard-bg-box">
                <div class="table-responsive">
                  <table class="table order-table">
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Order Code</th>
                        <th scope="col">Status</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datas.map((item, index) => (
                        <tr key={index} onClick={()=>handleClickSeeCart(item._id)} style={{cursor: 'pointer'}}>
                          <td class="product-image" >#{item._id.slice(-6)}</td>
                          <td class="product-image">#{item._id}</td>

                          <td>
                            <label
                              class={
                                item.status === "SUCCESS" ? "success" : "danger"
                              }
                            >
                              {item.status}
                            </label>
                          </td>
                          <td>
                            <h6>${item.Total}</h6>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationBasic
                data={allCart}
                setPage={setPage}
                limit={limit}
              />
              </div>
            </>
          )}
          
        </div>
      </div>
    </>
  );
};
