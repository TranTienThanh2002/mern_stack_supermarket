import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Slider from "react-slick";

import { Ckeditor } from "../../components/ckeditor/ckeditor";
export const AddNewProduct = ({ show, setShow , store}) => {
  const [info, setInfo] = useState([]);
  const [weights, setWeights] = useState([]);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState("");
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });
  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    // asNavFor: '.slider-nav'
  };
  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    // asNavFor: '.slider-for',
    infinite: images.length > 3,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    // rightPadding: '10px',
    vertical: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          //   vertical: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSelect = (e, type) => {
    const value = Array.from(
      e.target.selectedOptions,
      (options) => options.value
    );
    switch (type) {
      case "weight":
        setWeights(value);

        break;
      case "tag":
        setTags(value);

        break;

      default:
        break;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const list = await Promise.all(
        Object.values(images).map(async (image) => {
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
      const newProduct = {
        ...info,
        weight: weights,
        tags,
        photos: list,
        storeId: store._id
      };

      await axios.post("https://super-market-2ebn.onrender.com/api/product", newProduct);
      setShow(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        class={show ? "modal fade theme-modal show" : "modal fade theme-modal"}
        id="addNewProduct"
        tabindex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">
                Add new product
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
                <div className="col-xxl-6 col-lg-6 col-12">
                  <form action="" enctype="multipart/form-data" method="">
                    <div className="col-xxl-12 add-image">
                      <Slider
                        {...settingsMain}
                        asNavFor={nav2}
                        ref={(slider) => setSlider1(slider)}
                      >
                        {images.length > 0 ? (
                          Object.values(images).map((image, index) => (
                            <img
                              key={index}
                              class="add-product-image"
                              src={URL.createObjectURL(image)}
                              alt=""
                              width="364"
                              height="364"
                            />
                          ))
                        ) : (
                          <img
                            class="add-product-image"
                            src={
                              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                            width="364"
                            height="364"
                          />
                        )}
                      </Slider>
                      <div className="cover-icon">
                        <FaPen />
                        <input
                          type="file"
                          multiple
                          name="imageProduct"
                          onChange={(e) => setImages(e.target.files)}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-12 add-image-thumbnail">
                      <Slider
                        {...settingsThumbs}
                        asNavFor={nav1}
                        ref={(slider) => setSlider2(slider)}
                      >
                        {images.length > 0 ? (
                          Object.values(images).map((image, index) => (
                            <img
                              key={index}
                              class="add-product-image"
                              src={URL.createObjectURL(image)}
                              alt=""
                              width="73"
                              height="73"
                            />
                          ))
                        ) : (
                          <></>
                        )}
                      </Slider>
                    </div>
                  </form>
                </div>
                <div className="col-xxl-6 col-lg-6 col-12">
                  <div className="row g-4">
                    <div class="col-xxl-12">
                      <form>
                        <div class="form-floating theme-form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="productname"
                            onChange={(e) => handleChange(e)}
                          />
                          <label for="productname">Product Name</label>
                        </div>
                      </form>
                    </div>

                    <div class="col-xxl-6">
                      <form>
                        <div class="form-floating theme-form-floating">
                          <input
                            type="number"
                            class="form-control"
                            id="price"
                            onChange={(e) => handleChange(e)}
                          />
                          <label for="price">Original Price</label>
                        </div>
                      </form>
                    </div>

                    <div class="col-xxl-6">
                      <form>
                        <div class="form-floating theme-form-floating">
                          <input
                            class="form-control"
                            type="number"
                            name="discount"
                            id="discount"
                            maxlength="10"
                            onChange={(e) => handleChange(e)}
                          />
                          <label for="discount">Price Discount</label>
                        </div>
                      </form>
                    </div>

                    <div class="col-12">
                      <form>
                        <div class="form-floating theme-form-floating">
                          <input
                            type="text"
                            class="form-control"
                            id="sortdesc"
                            onChange={(e) => handleChange(e)}
                          />
                          <label for="sortdesc">Sort Description</label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                

                <div class="col-xxl-4">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <select
                        class="form-select"
                        id="tags"
                        onChange={(e) => handleSelect(e, "tag")}
                      >
                        <option selected>Choose Tag</option>
                        <option value="cake">Bakery, Cake & Dairy</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="beverage">Beverage</option>
                        <option value="meats">Eggs, Meats & Seafood</option>
                        <option value="breakfast">Breakfast & dairy</option>
                        <option value="frozen">Frozen Foods</option>
                        <option value="biscuits">Biscuits & Snacks</option>
                        <option value="grocery">Grocery & Staples</option>
                        <option value="wines">Wines & Alcohol Drinks</option>
                        <option value="milk">Milk & Dairies</option>
                        <option value="pet">Kitchen, Garden & Pets</option>
                      </select>
                      <label for="tags">Tag</label>
                    </div>
                  </form>
                </div>

                <div class="col-xxl-4">
                  <form>
                    <div class="form-floating theme-form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="qualified"
                        onChange={(e) => handleChange(e)}
                      />
                      <label for="qualified">Qualified</label>
                    </div>
                  </form>
                </div>
                <div className="col-xxl-12">
                    <Ckeditor/>
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
                onClick={(e)=>handleClick(e)}
              >
                Add new product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class={show ? "modal-backdrop fade show" : "modal-backdrop fade"}
      ></div>
    </>
  );
};
