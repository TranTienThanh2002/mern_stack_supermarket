import React, { useEffect, useState } from "react";
import coverImg from "../../../assets/images/inner-page/cover-img.jpg";
import logo from "../../../assets/images/vendor-page/logo.png";
import { BiHomeAlt } from "react-icons/bi";
import { FiLogOut, FiSettings, FiShoppingBag, FiUser } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { MdClose } from "react-icons/md";

export const DashBoardLeftSlideBar = ({
  switchPage,
  dashboard,
  product,
  order,
  profile,
  settings,
  store,
  userId,
  setStore,
  setShowMenuMobile,
  showMenuMobile
}) => {
  const [images, setImages] = useState("");

  const activeLink = (element) => {
    document.querySelector(".nav-link.active").classList.remove("active");

    element.classList.add("active");
    setShowMenuMobile(false);
  };
  const useFetch = async () => {
    try {
      // var { data } = await axios.get(`/users/get/${email}`, config);
      // setData(data);
      var { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/store/getStore/${store._id}`);
      setStore(data);
    } catch (error) {
      throw error;
    }
  };
  const handleChangeAvatar = async (e) => {
    setImages(e.target.files);
    try {
      await axios.post(`https://super-market-2ebn.onrender.com/api/store/deleteImage/${store._id}`);
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
      const photosStore = {
        photos: list[0],
      };

      await axios.put(`https://super-market-2ebn.onrender.com/api/store/updateStore/${store._id}`, photosStore);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useFetch();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetch();
  }, [images]);
  return (
    <>
      <div class={showMenuMobile?"dashboard-left-sidebar show":"dashboard-left-sidebar"}>
        <div class="close-button d-flex d-lg-none">
          <button class="close-sidebar" onClick={() => setShowMenuMobile(false)}>
          <MdClose class="icons" />
          </button>
        </div>
        <div class="profile-box">
          <div class="cover-image">
            <img src={coverImg} class="img-fluid blur-up lazyload" alt="" />
          </div>

          <div class="profile-contain">
            <div class="profile-image">
              <div class="position-relative">
                <img
                  src={
                    store.photos !== ""
                      ? store.photos
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  class="blur-up lazyload update_img"
                  alt=""
                />
                <div class="cover-icon">
                  <FaPen className="icons"></FaPen>
                  <input type="file" onChange={(e) => handleChangeAvatar(e)} />
                </div>
              </div>
            </div>

            <div class="profile-name">
              {store.hasOwnProperty("storeName") && (
                <>
                  <h3>{store.storeName}</h3>
                  <h6 class="text-content">{store.email}</h6>
                </>
              )}
            </div>
          </div>
        </div>

        <ul class="nav nav-pills user-nav-pills" id="pills-tab" role="tablist">
          <li
            class="nav-item"
            role="presentation"
            onClick={(e) => {
              switchPage();
              dashboard(true);
              activeLink(e.target);
            }}
          >
            <a
              href="#pills-tabContent"
              class="nav-link active"
              id="pills-dashboard-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-dashboard"
              role="tab"
              aria-controls="pills-dashboard"
              aria-selected="true"
            >
              <BiHomeAlt className="feather feather-home" />
              DashBoard
            </a>
          </li>

          <li
            class="nav-item"
            role="presentation"
            onClick={(e) => {
              switchPage();
              product(true);
              activeLink(e.target);
            }}
          >
            <button
              class="nav-link"
              id="pills-product-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-product"
              type="button"
              role="tab"
              aria-controls="pills-product"
              aria-selected="false"
            >
              <FiShoppingBag className="feather feather-home" />
              Products
            </button>
          </li>

          <li
            class="nav-item"
            role="presentation"
            onClick={(e) => {
              switchPage();
              order(true);
              activeLink(e.target);
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
              profile(true);
              activeLink(e.target);
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

          <li
            class="nav-item"
            role="presentation"
            onClick={(e) => {
              switchPage();
              settings(true);
              activeLink(e.target);
            }}
          >
            <button
              class="nav-link"
              id="pills-security-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-security"
              type="button"
              role="tab"
              aria-controls="pills-security"
              aria-selected="false"
            >
              <FiSettings className="feather feather-home" />
              Setting
            </button>
          </li>

          {/* <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="pills-out-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-out"
              type="button"
              role="tab"
              aria-selected="false"
            >
              <FiLogOut className="feather feather-home"/>
              Log Out
            </button>
          </li> */}
        </ul>
      </div>
      <div
        class={showMenuMobile ? "bg-overlay show" : "bg-overlay"}
        style={{ zIndex: "3" }}
        onClick={()=>setShowMenuMobile(false)}
      ></div>
    </>
  );
};
