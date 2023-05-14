import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import coverImage from "../../assets/images/inner-page/cover-img.jpg";
import { BiHomeAlt } from "react-icons/bi";
import { FiMapPin, FiShoppingBag, FiUser } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import axios from "axios";
import { UserOrders } from "./userOrders";
import { UserCartDetails } from "./userCartDetails";
import { UserAddressBook } from "./userAddressBook";
import { UserProfile } from "./userProfile";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useWishListContext } from "../../redux/contexts/wishlistContext/wishlistContext";
export const UserDashboard = () => {
  const [dashboard, setDashBoard] = useState(true);
  const [order, setOrder] = useState(false);
  const [savedCard, setSavedCard] = useState(false);
  const [address, setAddress] = useState(false);
  const [profile, setProfile] = useState(false);
  const [data, setData] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [info, setInfo] = useState([]);
  const [show, setShow] = useState(false);
  const [passWord, setPassWord] = useState("");
  const [oldPassWord, setOldPassWord] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [images, setImages] = useState("");
  const [totalOrderPending, setTotalOrderPending] = useState(0);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const { wishlistItems } = useWishListContext();
  const [loading, setLoading] = useState(false);
  const switchPage = () => {
    setOrder(false);
    setDashBoard(false);
    setSavedCard(false);
    setProfile(false);
    setAddress(false);
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      X_authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
  const email = localStorage.getItem("users");
  const useFetch = async () => {
    try {
      let { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/users/get/${email}`, config);
      setData(data);
      setLoading(true)
    } catch (error) {
      throw error;
    }
  };
  const getOrders = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/cart/getAllCartByUser/${email}`);
    setListOrder(data);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetch();
  }, [images]);
  useEffect(() => {}, [data]);
  useEffect(() => {
    getOrders();
    refetchAllCart();
  }, []);
  const activeLink = (element) => {
    document.querySelector(".nav-link.active").classList.remove("active");

    element.classList.add("active");
    setShowMenuMobile(false);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleEditClick = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSaveChangeClick = async (e) => {
    await axios.put(`https://super-market-2ebn.onrender.com/api/users/update/${data.id}`, info);
    setShow(false);
  };
  const handleChangePasswordClick = async (e) => {
    if (confirmPassWord !== passWord) {
      setMessage("Password don't match!!!");
    } else {
      const passwords = {
        newPassword: passWord,
        oldPassword: oldPassWord,
      };
      await axios.put(`https://super-market-2ebn.onrender.com/api/users/changePassWord/${data.id}`, passwords);
      setShowChangePassword(false);
      setMessage("");
    }
  };
  const handleChangeAvatar = async (e) => {
    setImages(e.target.files);
    try {
      await axios.post(`https://super-market-2ebn.onrender.com/api/users/deleteImage/${data.id}`);
      const list = await Promise.all(
        Object.values(e.target.files).map(async (image) => {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "images");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dthybdbt9/image/upload",
            data
            // `https://api.cloudinary.com/v1_1/dthybdbt9/image/upload?file=${images}&api_key=361758193517627&signature=unsigned&timestamp=${Date.now()}`,
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      const photosUser = {
        photos: list[0],
      };

      await axios.put(`https://super-market-2ebn.onrender.com/api/users/update/${data.id}`, photosUser);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useFetch();
    } catch (error) {
      console.log(error);
    }
  };
  const refetchAllCart = async () => {
    const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/cart/getAllCartByUser/${email}`);
    let OrderPending = 0;
    const total = data.map((item) => {
      if (item.status === "PENDING") {
        OrderPending++;
      }
      return OrderPending;
    });
    // OrderPending = total[total.length - 1];
    setTotalOrderPending(OrderPending);
  };
  useEffect(() => {}, [showMenuMobile]);
  return (
    <>
    {!loading && (
        <div class="fullpage-loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <BreadCrumb title="User Dashboard" />
      <section class="user-dashboard-section section-b-space">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-xxl-3 col-lg-4">
              <div
                class={
                  showMenuMobile
                    ? "dashboard-left-sidebar show"
                    : "dashboard-left-sidebar"
                }
              >
                <div class="close-button d-flex d-lg-none">
                  <button
                    class="close-sidebar "
                    onClick={() => setShowMenuMobile(false)}
                  >
                    <MdClose class="icons" />
                  </button>
                </div>
                <div class="profile-box">
                  <div class="cover-image">
                    <img
                      src={coverImage}
                      class="img-fluid blur-up lazyload"
                      alt=""
                    />
                  </div>

                  <div class="profile-contain">
                    <div class="profile-image">
                      <div class="position-relative">
                        <img
                          src={
                            data !== []
                              ? data.photos
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          class="blur-up lazyload update_img"
                          alt=""
                        />
                        <div class="cover-icon">
                          <FaPen className="icons"></FaPen>
                          <input
                            type="file"
                            onChange={(e) => handleChangeAvatar(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="profile-name">
                      {data.hasOwnProperty("fullName") && (
                        <>
                          <h3>{data.fullName}</h3>
                          <h6 class="text-content">{data.email}</h6>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <ul
                  class="nav nav-pills user-nav-pills"
                  id="pills-tab"
                  role="tablist"
                >
                  <li
                    class="nav-item"
                    role="presentation"
                    onClick={(e) => {
                      switchPage();
                      activeLink(e.target);
                      setDashBoard(true);
                      scrollTop();
                    }}
                  >
                    <button
                      class="nav-link active"
                      id="pills-dashboard-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-dashboard"
                      type="button"
                      role="tab"
                      aria-controls="pills-dashboard"
                      aria-selected="true"
                    >
                      <BiHomeAlt className="feather feather-home" />
                      DashBoard
                    </button>
                  </li>

                  <li
                    class="nav-item"
                    role="presentation"
                    onClick={(e) => {
                      switchPage();
                      activeLink(e.target);
                      setOrder(true);
                      scrollTop();
                    }}
                  >
                    <button
                      class="nav-link"
                      id="pills-order-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-order"
                      type="button"
                      role="tab"
                      aria-controls="pills-order"
                      aria-selected="false"
                    >
                      <FiShoppingBag className="feather feather-home" />
                      Order
                    </button>
                  </li>

                  <li
                    class="nav-item"
                    role="presentation"
                    onClick={(e) => {
                      switchPage();
                      activeLink(e.target);
                      setSavedCard(true);
                      scrollTop();
                    }}
                  >
                    <button
                      class="nav-link"
                      id="pills-card-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-card"
                      type="button"
                      role="tab"
                      aria-controls="pills-card"
                      aria-selected="false"
                    >
                      <BsCreditCard className="feather feather-home" /> Saved
                      Card
                    </button>
                  </li>

                  <li
                    class="nav-item"
                    role="presentation"
                    onClick={(e) => {
                      switchPage();
                      activeLink(e.target);
                      setAddress(true);
                      scrollTop();
                    }}
                  >
                    <button
                      class="nav-link"
                      id="pills-address-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-address"
                      type="button"
                      role="tab"
                      aria-controls="pills-address"
                      aria-selected="false"
                    >
                      <FiMapPin className="feather feather-home" />
                      Address
                    </button>
                  </li>

                  <li
                    class="nav-item"
                    role="presentation"
                    onClick={(e) => {
                      switchPage();
                      activeLink(e.target);
                      setProfile(true);
                      scrollTop();
                    }}
                  >
                    <button
                      class="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      <FiUser className="feather feather-home" />
                      Profile
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xxl-9 col-lg-8">
              <button
                class="left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none"
                onClick={() => setShowMenuMobile(true)}
              >
                Show Menu
              </button>
              <div class="dashboard-right-sidebar">
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-dashboard"
                    role="tabpanel"
                    aria-labelledby="pills-dashboard-tab"
                  >
                    {dashboard && (
                      <>
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
                              Hello, <b class="text-title">{data.fullName}</b>
                            </h6>
                            <p class="text-content">
                              From your My Account Dashboard you have the
                              ability to view a snapshot of your recent account
                              activity and update your account information.
                              Select a link below to view or edit information.
                            </p>
                          </div>

                          <div class="total-box">
                            <div class="row g-sm-4 g-3">
                              <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
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
                                    <h5>Total Order</h5>
                                    <h3>{listOrder.length}</h3>
                                  </div>
                                </div>
                              </div>

                              <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
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
                                    <h5>Total Pending Order</h5>
                                    <h3>{totalOrderPending}</h3>
                                  </div>
                                </div>
                              </div>

                              <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
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
                                    <h5>Total Wishlist</h5>
                                    <h3>{wishlistItems.length}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="dashboard-title">
                            <h3>Account Information</h3>
                          </div>

                          <div class="row g-4">
                            <div class="col-xxl-6">
                              <div class="dashboard-contant-title">
                                <h4>
                                  Contact Information{" "}
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#editProfile"
                                    onClick={(e) => handleEditClick(e)}
                                  >
                                    Edit
                                  </Link>
                                </h4>
                              </div>
                              <div class="dashboard-detail">
                                <h6 class="text-content">{data.fullName}</h6>
                                <h6 class="text-content">{data.email}</h6>
                                <Link
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowChangePassword(true);
                                  }}
                                >
                                  Change Password
                                </Link>
                              </div>
                            </div>

                            <div class="col-xxl-6">
                              <div class="dashboard-contant-title">
                                <h4>
                                  Newsletters{" "}
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#editProfile"
                                    // onClick={(e) => handleEditClick(e)}
                                  >
                                    Edit
                                  </Link>
                                </h4>
                              </div>
                              <div class="dashboard-detail">
                                <h6 class="text-content">
                                  You are currently not subscribed to any
                                  newsletter
                                </h6>
                              </div>
                            </div>

                            <div class="col-12">
                              <div class="dashboard-contant-title">
                                <h4>
                                  Address Book{" "}
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#editProfile"
                                    onClick={(e) => handleEditClick(e)}
                                  >
                                    Edit
                                  </Link>
                                </h4>
                              </div>

                              <div class="row g-4">
                                <div class="col-xxl-6">
                                  <div class="dashboard-detail">
                                    <h6 class="text-content">
                                      Default Billing Address
                                    </h6>
                                    <h6 class="text-content">
                                      You have not set a default billing
                                      address.
                                    </h6>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#editProfile"
                                      onClick={(e) => handleEditClick(e)}
                                    >
                                      Edit Address
                                    </Link>
                                  </div>
                                </div>

                                <div class="col-xxl-6">
                                  <div class="dashboard-detail">
                                    <h6 class="text-content">
                                      Default Shipping Address
                                    </h6>
                                    <h6 class="text-content">
                                      You have not set a default shipping
                                      address.
                                    </h6>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#editProfile"
                                      onClick={(e) => handleEditClick(e)}
                                    >
                                      Edit Address
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {order && <UserOrders />}
                    {savedCard && <UserCartDetails />}
                    {address && <UserAddressBook id={data.id} />}
                    {profile && (
                      <UserProfile profile={data} setProfile={setData} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        class={show ? "modal fade theme-modal show" : "modal fade theme-modal"}
        id="editProfile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">
                Edit Profile
              </h5>
              <button
                type="button"
                class="btn-close btn-close-addProduct"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShow(false)}
              >
                <MdClose class="icons" />
              </button>
            </div>
            <div class="modal-body">
              <div class="row g-4">
                <div class="col-xxl-12">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="fullName"
                        defaultValue={data.fullName}
                        onChange={(e) => handleChange(e)}
                      />
                      <label for="fullName">Full Name</label>
                    </div>
                  </form>
                </div>

                <div class="col-xxl-6">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        defaultValue={data.email}
                        onChange={(e) => handleChange(e)}
                      />
                      <label for="email">Email address</label>
                    </div>
                  </form>
                </div>

                <div class="col-xxl-6">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        class="form-control"
                        type="tel"
                        name="phone"
                        id="phone"
                        maxlength="10"
                        defaultValue={data.phone}
                        oninput="javascript: if (this.value.length > this.maxLength) this.value =
                                            this.value.slice(0, this.maxLength);"
                        onChange={(e) => handleChange(e)}
                      />
                      <label for="phone">Phone Number</label>
                    </div>
                  </form>
                </div>

                <div class="col-12">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        defaultValue={data.address}
                        onChange={(e) => handleChange(e)}
                      />
                      <label for="address">Add Address</label>
                    </div>
                  </form>
                </div>

                <div class="col-12">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="gender"
                        defaultValue={data.gender}
                        onChange={(e) => handleChange(e)}
                      />
                      <label for="gender">Gender</label>
                    </div>
                  </form>
                </div>

                <div class="col-xxl-4">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <select
                        class="form-select"
                        id="country"
                        aria-label="Floating label select example"
                        defaultValue={data.country}
                        onChange={(e) => handleChange(e)}
                      >
                        <option selected>Choose Your Country</option>
                        <option value="kindom">United Kingdom</option>
                        <option value="states">United States</option>
                        <option value="fra">France</option>
                        <option value="china">China</option>
                        <option value="spain">Spain</option>
                        <option value="italy">Italy</option>
                        <option value="turkey">Turkey</option>
                        <option value="germany">Germany</option>
                        <option value="russian">Russian Federation</option>
                        <option value="malay">Malaysia</option>
                        <option value="mexico">Mexico</option>
                        <option value="austria">Austria</option>
                        <option value="hong">Hong Kong SAR, China</option>
                        <option value="ukraine">Ukraine</option>
                        <option value="thailand">Thailand</option>
                        <option value="saudi">Saudi Arabia</option>
                        <option value="canada">Canada</option>
                        <option value="singa">Singapore</option>
                      </select>
                      <label for="country">Country</label>
                    </div>
                  </form>
                </div>

                <div class="col-xxl-4">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <select
                        class="form-select"
                        id="city"
                        onChange={(e) => handleChange(e)}
                        defaultValue={data.city}
                      >
                        <option selected>Choose Your City</option>
                        <option value="kindom">India</option>
                        <option value="states">Canada</option>
                        <option value="fra">Dubai</option>
                        <option value="china">Los Angeles</option>
                        <option value="spain">Thailand</option>
                      </select>
                      <label for="city">City</label>
                    </div>
                  </form>
                </div>

                <div class="col-xxl-4">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="pinCode"
                        defaultValue={data.pinCode}
                        onChange={(e) => handleChange(e)}
                      />
                      <label for="pinCode">Pin Code</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-animation btn-md fw-bold"
                data-bs-dismiss="modal"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                class="btn theme-bg-color btn-md fw-bold text-light"
                onClick={(e) => handleSaveChangeClick(e)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class={
          showChangePassword
            ? "modal fade theme-modal show"
            : "modal fade theme-modal"
        }
        id="editProfile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">
                Change Password
              </h5>
              <button
                type="button"
                class="btn-close btn-close-addProduct"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowChangePassword(false)}
              >
                <MdClose class="icons" />
              </button>
            </div>
            <div class="modal-body">
              <div class="row g-4">
                <div class="col-xxl-12">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="password"
                        class="form-control"
                        id="oldPassWord"
                        placeholder="Old Password"
                        onChange={(e) => setOldPassWord(e.target.value)}
                      />
                      <label for="oldPassWord">Old Password</label>
                    </div>
                  </form>
                </div>

                <div class="col-12">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassWord(e.target.value)}
                      />
                      <label for="password">Password</label>
                    </div>
                  </form>
                </div>
                <div class="col-12">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="password"
                        class="form-control"
                        id="conFirmPassword"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassWord(e.target.value)}
                      />
                      <label for="conFirmPassword">Confirm Password</label>
                    </div>
                  </form>
                </div>
                {message !== "" && (
                  <div style={{ color: "red" }}>{message}*</div>
                )}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-animation btn-md fw-bold"
                data-bs-dismiss="modal"
                onClick={() => setShowChangePassword(false)}
              >
                Close
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                class="btn theme-bg-color btn-md fw-bold text-light"
                onClick={(e) => handleChangePasswordClick(e)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class={
          show || showChangePassword
            ? "modal-backdrop fade show"
            : "modal-backdrop fade"
        }
      ></div>
      <div
        class={showMenuMobile ? "bg-overlay show" : "bg-overlay"}
        style={{ zIndex: "3" }}
        onClick={()=>setShowMenuMobile(false)}
      ></div>
    </>
  );
};
