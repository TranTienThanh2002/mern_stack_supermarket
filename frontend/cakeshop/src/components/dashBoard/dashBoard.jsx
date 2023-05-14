import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { DashBoardLeftSlideBar } from "../commons/dashBoardLeftSlidebar/dashBoardLeftSlidebar";
import { TrendingProduct } from "../trendingProduct/trendingProduct";

import { Product } from "../../sellers/products/product";
import { Orders } from "../../sellers/orders/orders";
import { Profiles } from "../../sellers/profiles/profiles";
import { Settings } from "../../sellers/settings/settings";
// import { faker } from '@faker-js/faker';
import axios from "axios";
import useFetch from "../../hooks/useFetch";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);
export const DashBoard = () => {
  const [dashBoard, setDashBoard] = useState(true);
  const [products, setProduct] = useState(false);
  const [orders, setOrders] = useState(false);
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [store, setStore] = useState([]);
  const [userId, setUserId] = useState("");
  const [allCart, setAllCart] = useState([]);
  const [totalArray, setTotalArray] = useState([]);
  const [totalOrderPending, setTotalOrderPending] = useState(0);
  const [totalOrderCancel, setTotalOrderCancel] = useState(0);
  const [totalOrderSuccess, setTotalOrderSuccess] = useState(0);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const switchPage = () => {
    setSettings(false);
    setDashBoard(false);
    setProduct(false);
    setOrders(false);
    setProfile(false);
    scrollTop();
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      X_authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };

  const email = localStorage.getItem("users");
  const useFetchs = async () => {
    try {
      var { data } = await axios.get(`/users/get/${email}`, config);
      setUserId(data.id);
      const storeId = data.store;
      var { data } = await axios.get(`/store/getStore/${storeId}`);
      setStore(data);
    } catch (error) {
      throw error;
    }
  };
  
  const refetchAllCart = async () => {
    const { data } = await axios.get(`/cart/getAllCart/`, config);
    let OrderPending = 0;
    let OrderCancel = 0;
    let OrderSuccess = 0;
    
    let array = new Array(12).fill(0);
    const total = data.map((item) => {
      if (item.status === "PENDING") {
        OrderPending++;
      }
      else if(item.status === "SUCCESS"){
        OrderSuccess++
      }
      else{
        OrderCancel++;
      }
      for(let i=1;i<13;i++){
       
        if(item.status === "SUCCESS"){
          
          
          var date = new Date(Date.parse(item.createdAt));
          var month = date.getMonth();
          if(i===month){
            array[month]+=parseFloat(item.Total);
          }
          
        }
        
      }
      
      return OrderPending;
    });
    setTotalArray(array)
    // OrderPending = total[total.length - 1];
    setTotalOrderPending(OrderPending);
    setTotalOrderCancel(OrderCancel);
    setTotalOrderSuccess(OrderSuccess);
    setAllCart(data);
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Overall Sales",
      },
    },
  };
  let chartDoughnut = {
    labels: ["Cancel Order", "Pending Payments", "Complete Order"],
    datasets: [
      {
        label: "#order",
        data: [totalOrderCancel, totalOrderPending, totalOrderSuccess],
        backgroundColor: [
          "rgb(255 114 114)",
          "rgb(226, 240, 237)",
          "rgb(13, 164, 135)",
        ],
        borderColor: [
          "rgb(255, 255, 255)",
          "rgb(255, 255, 255)",
          "rgb(255, 255, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let ChartLine = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Total price",
        data: totalArray,
        borderColor: "rgb(13, 164, 135)",
        backgroundColor: "rgb(13, 164, 135, 0.6)",
      },
    ],
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetchs();
    refetchAllCart();
  }, []);
  useEffect(() => {}, [showMenuMobile]);
  return (
    <>
      <section class="user-dashboard-section section-b-space">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-xxl-3 col-lg-4">
              <DashBoardLeftSlideBar
                switchPage={switchPage}
                dashboard={setDashBoard}
                product={setProduct}
                order={setOrders}
                profile={setProfile}
                settings={setSettings}
                store={store}
                userId={userId}
                setStore={setStore}
                setShowMenuMobile = {setShowMenuMobile}
                showMenuMobile = {showMenuMobile}
              />
            </div>

            <div class="col-xxl-9 col-lg-8">
              <button class="left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none"
              onClick={() => setShowMenuMobile(true)}>
                Show Menu
              </button>
              <div class="dashboard-right-sidebar">
                <div class="tab-content" id="pills-tabContent">
                  {dashBoard && (
                    <>
                      {store.hasOwnProperty("product") && (
                        <div
                          class="tab-pane fade show active"
                          id="pills-dashboard"
                          role="tabpanel"
                          aria-labelledby="pills-dashboard-tab"
                        >
                          <div class="dashboard-home">
                            <div class="title">
                              <h2>My Dashboard</h2>
                              <span class="title-leaf">
                                <svg class="icon-width bg-gray">
                                  <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
                                </svg>
                              </span>
                            </div>

                            <div class="dashboard-user-name">
                              <h6 class="text-content">
                                Hello,{" "}
                                <b class="text-title">{store.storeName}</b>
                              </h6>
                              <p class="text-content">
                                From your My Account Dashboard you have the
                                ability to view a snapshot of your recent
                                account activity and update your account
                                information. Select a link below to view or edit
                                information.
                              </p>
                            </div>

                            <div class="total-box">
                              <div class="row g-sm-4 g-3">
                                <div class="col-xxl-6 col-lg-6 col-md-6 col-sm-6">
                                  <div class="totle-contain">
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                      class="img-1 blur-up lazyload"
                                      alt=""
                                    />
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                      class="blur-up lazyload"
                                      alt=""
                                    />
                                    <div class="totle-detail">
                                      <h5>Total Products</h5>
                                      <h3>{store.product.length}</h3>
                                    </div>
                                  </div>
                                </div>

                                {/* <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                  <div class="totle-contain">
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                      class="img-1 blur-up lazyload"
                                      alt=""
                                    />
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                      class="blur-up lazyload"
                                      alt=""
                                    />
                                    <div class="totle-detail">
                                      <h5>Total Sales</h5>
                                      <h3>12550</h3>
                                    </div>
                                  </div>
                                </div> */}

                                <div class="col-xxl-6 col-lg-6 col-md-6 col-sm-6">
                                  <div class="totle-contain">
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                      class="img-1 blur-up lazyload"
                                      alt=""
                                    />
                                    <img
                                      src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg"
                                      class="blur-up lazyload"
                                      alt=""
                                    />
                                    <div class="totle-detail">
                                      <h5>Order Pending</h5>
                                      <h3>{totalOrderPending}</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row g-4">
                              

                              <div class="col-xxl-12">
                                <div class="dashboard-bg-box">
                                  <Line options={options} data={ChartLine} />
                                </div>
                              </div>
                              <div class="col-xxl-6">
                                <div class="dashboard-bg-box">
                                  <Doughnut
                                    data={chartDoughnut}
                                    options={options}
                                  />
                                  ;
                                </div>
                              </div>
                              <div class="col-xxl-6">
                                <TrendingProduct />
                              </div>

                              {/* <div class="col-xxl-6">
                                <RecentOrder />
                              </div> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {products && (
                    <>
                      <Product />
                    </>
                  )}

                  {orders && (
                    <>
                      <Orders />
                    </>
                  )}
                  {profile && (
                    <>
                      <Profiles store={store} setStore={setStore} />
                    </>
                  )}
                  {settings && <Settings store={store} userId={userId} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
