import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Rating } from "@mui/material";
import { useFillterProductContext } from "../../../redux/contexts/filterProductContext/filterProductContext";
import axios from "axios";
export const LeftBox = ({ setData, setShowFilterMobile, showFilterMobile }) => {
  const [valuePrice, setValuePrice] = useState([]);
  const [collapses, setCollapse] = useState(
    "collapseOne accordion-collapse collapse show"
  );
  const handleCollapseClick = (collapse) => {
    document.querySelector(`#${collapse}`).classList.toggle("show");
    setCollapse(
      collapse + " " + document.querySelector(`#${collapse}`).classList.value
    );
  };

  const {
    tags,
    rating,
    startPrice,
    endPrice,
    sortBy,
    page,
    limit,
    addTag,
    removeTag,
    endPrices,
    startPrices,
    addRating,
    removeRating,
  } = useFillterProductContext();
  const handleChange = (e) => {
    if (e.target.checked) {
      addTag(e.target.id);
    } else {
      removeTag(e.target.id);
    }
  };
  const handleChangeRating = (e) => {
    if (e.target.checked) {
      addRating(e.target.id);
    } else {
      removeRating(e.target.id);
    }
  };
  const handleChangePrice = async (e) => {
    setValuePrice(e);
    endPrices(e[1]);
    startPrices(e[0]);
  };
  const checked = () => {
    try {
      if (tags.length === 1) {
        const checkBox = document.querySelectorAll(".checkbox_animated");
        checkBox.forEach((item) => {
          item.checked = false;
        });
        document.getElementById(`${tags[0]}`).checked = true;
      }
    } catch (error) {
      console.log("checked error");
    }
  };
  useEffect(() => {
    checked();
  }, [tags]);
  useEffect(() => {
    const fetchProduct = async () => {
      const filterProduct = {
        tags: tags,
        sortBy: sortBy,
        endPrice: endPrice,
        startPrice: startPrice,
        page: page,
        limit: limit,
        rating: rating,
      };
      try {
        const { data } = await axios.post("https://super-market-2ebn.onrender.com/api/product/filter/", filterProduct);
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, [tags, startPrice, endPrice, page, rating]);
  return (
    <>
      <div
        class={showFilterMobile?"left-box wow fadeInUp show":"left-box wow fadeInUp "}
        style={{ visibility: "visible;", animationName: "fadeInUp;" }}
      >
        <div class="shop-left-sidebar">
          <div class="back-button" onClick={()=>setShowFilterMobile(false)}>
            <h3>
              <FiArrowLeft className="icons"/> Back
            </h3>
          </div>

          <div class="accordion custome-accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  onClick={() => handleCollapseClick("collapseOne")}
                >
                  <span>Categories</span>
                  {collapses ===
                  "collapseOne accordion-collapse collapse show" ? (
                    <FiChevronDown className="icon" />
                  ) : (
                    <FiChevronUp className="icon" />
                  )}
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
              >
                <div class="accordion-body">
                  {/* <div class="form-floating theme-form-floating-2 search-box">
                    <input
                      type="search"
                      class="form-control"
                      id="search"
                      placeholder="Search .."
                    />
                    <label for="search">Search</label>
                    <FiSearch className="icon" />
                  </div> */}

                  <ul class="category-list custom-padding custom-height">
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="vegetable"
                          value="vegetable"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="vegetable">
                          <span class="name">Fruits & Vegetables</span>
                          {/* <span class="number">(15)</span> */}
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="cake"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="cake">
                          <span class="name">Bakery, Cake & Dairy</span>
                          {/* <span class="number">(12)</span> */}
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="breakfast"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="breakfast">
                          <span class="name">Breakfast & dairy</span>
                          {/* <span class="number">(12)</span> */}
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="beverage"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="beverages">
                          <span class="name">Beverages</span>
                          {/* <span class="number">(20)</span> */}
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="biscuits"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="biscuits">
                          <span class="name">Biscuits & Snacks</span>
                          {/* <span class="number">(05)</span> */}
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="pet"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="pets">
                          <span class="name">Kitchen, Garden & Pets</span>
                          {/* <span class="number">(50)</span> */}
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="meats"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="egg">
                          <span class="name">Eggs, Meats & Seafood</span>
                          {/* <span class="number">(19)</span> */}
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="frozen"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="frozen">
                          <span class="name">Frozen Foods</span>
                          {/* <span class="number">(06)</span> */}
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="grocery"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="grocery">
                          <span class="name">Grocery & Staples</span>
                          {/* <span class="number">(01)</span> */}
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="wines"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="wines">
                          <span class="name">Wines & Alcohol Drink</span>
                          {/* <span class="number">(03)</span> */}
                        </label>
                      </div>
                    </li>
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="milk"
                          onChange={(e) => handleChange(e)}
                        />
                        <label class="form-check-label" for="milk">
                          <span class="name">Milk & Dairies</span>
                          {/* <span class="number">(03)</span> */}
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  onClick={() => handleCollapseClick("collapseThree")}
                >
                  <span>Price</span>
                  {collapses ===
                  "collapseThree accordion-collapse collapse show" ? (
                    <FiChevronDown className="icon" />
                  ) : (
                    <FiChevronUp className="icon" />
                  )}
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
              >
                <div class="accordion-body">
                  <RangeSlider
                    className="range-slider"
                    min={0}
                    max={1000000}
                    step={50000}
                    defaultValue={[200000, 600000]}
                    onInput={(e) => handleChangePrice(e)}
                  />
                  <input
                    type="text"
                    class="js-range-slider"
                    value={valuePrice}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* <div class="accordion-item">
              <h2 class="accordion-header" id="headingSix">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseSix"
                  onClick={() => handleCollapseClick("collapseSix")}
                >
                  <span>Rating</span>
                  {collapses ===
                  "collapseSix accordion-collapse collapse show" ? (
                    <FiChevronDown className="icon" />
                  ) : (
                    <FiChevronUp className="icon" />
                  )}
                </button>
              </h2>
              <div
                id="collapseSix"
                class="accordion-collapse collapse"
                aria-labelledby="headingSix"
              >
                <div class="accordion-body">
                  <ul class="category-list custom-padding">
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="5"
                          onChange={(e) => handleChangeRating(e)}
                        />
                        <div class="form-check-label">
                          <Rating
                            name="size-medium"
                            defaultValue={5}
                            readOnly
                          />
                          <span class="text-content">(5 Star)</span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="4"
                          onChange={(e) => handleChangeRating(e)}
                        />
                        <div class="form-check-label">
                          <Rating
                            name="size-medium"
                            defaultValue={4}
                            readOnly
                          />
                          <span class="text-content">(4 Star)</span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="3"
                          onChange={(e) => handleChangeRating(e)}
                        />
                        <div class="form-check-label">
                          <Rating
                            name="size-medium"
                            defaultValue={3}
                            readOnly
                          />
                          <span class="text-content">(3 Star)</span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="2"
                          onChange={(e) => handleChangeRating(e)}
                        />
                        <div class="form-check-label">
                          <Rating
                            name="size-medium"
                            defaultValue={2}
                            readOnly
                          />
                          <span class="text-content">(2 Star)</span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="2"
                          onChange={(e) => handleChangeRating(e)}
                        />
                        <div class="form-check-label">
                          <Rating
                            name="size-medium"
                            defaultValue={1}
                            readOnly
                          />
                          <span class="text-content">(1 Star)</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFour">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  onClick={() => handleCollapseClick("collapseFour")}
                >
                  <span>Discount</span>
                  {collapses ===
                  "collapseFour accordion-collapse collapse show" ? (
                    <FiChevronDown className="icon" />
                  ) : (
                    <FiChevronUp className="icon" />
                  )}
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="headingFour"
              >
                <div class="accordion-body">
                  <ul class="category-list custom-padding">
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          <span class="name">upto 5%</span>
                          <span class="number">(06)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault1"
                        />
                        <label class="form-check-label" for="flexCheckDefault1">
                          <span class="name">5% - 10%</span>
                          <span class="number">(08)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault2"
                        />
                        <label class="form-check-label" for="flexCheckDefault2">
                          <span class="name">10% - 15%</span>
                          <span class="number">(10)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault3"
                        />
                        <label class="form-check-label" for="flexCheckDefault3">
                          <span class="name">15% - 25%</span>
                          <span class="number">(14)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault4"
                        />
                        <label class="form-check-label" for="flexCheckDefault4">
                          <span class="name">More than 25%</span>
                          <span class="number">(13)</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFive">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                  onClick={() => handleCollapseClick("collapseFive")}
                >
                  <span>Pack Size</span>
                  {collapses ===
                  "collapseFive accordion-collapse collapse show" ? (
                    <FiChevronDown className="icon" />
                  ) : (
                    <FiChevronUp className="icon" />
                  )}
                </button>
              </h2>
              <div
                id="collapseFive"
                class="accordion-collapse collapse"
                aria-labelledby="headingFive"
              >
                <div class="accordion-body">
                  <ul class="category-list custom-padding custom-height">
                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault5"
                        />
                        <label class="form-check-label" for="flexCheckDefault5">
                          <span class="name">400 to 500 g</span>
                          <span class="number">(05)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault6"
                        />
                        <label class="form-check-label" for="flexCheckDefault6">
                          <span class="name">500 to 700 g</span>
                          <span class="number">(02)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault7"
                        />
                        <label class="form-check-label" for="flexCheckDefault7">
                          <span class="name">700 to 1 kg</span>
                          <span class="number">(04)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault8"
                        />
                        <label class="form-check-label" for="flexCheckDefault8">
                          <span class="name">
                            120 - 150 g each Vacuum 2 pcs
                          </span>
                          <span class="number">(06)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault9"
                        />
                        <label class="form-check-label" for="flexCheckDefault9">
                          <span class="name">1 pc</span>
                          <span class="number">(09)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault10"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault10"
                        >
                          <span class="name">1 to 1.2 kg</span>
                          <span class="number">(06)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault11"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault11"
                        >
                          <span class="name">2 x 24 pcs Multipack</span>
                          <span class="number">(03)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault12"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault12"
                        >
                          <span class="name">2x6 pcs Multipack</span>
                          <span class="number">(04)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault13"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault13"
                        >
                          <span class="name">4x6 pcs Multipack</span>
                          <span class="number">(05)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault14"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault14"
                        >
                          <span class="name">5x6 pcs Multipack</span>
                          <span class="number">(09)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault15"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault15"
                        >
                          <span class="name">Combo 2 Items</span>
                          <span class="number">(10)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault16"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault16"
                        >
                          <span class="name">Combo 3 Items</span>
                          <span class="number">(14)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault17"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault17"
                        >
                          <span class="name">2 pcs</span>
                          <span class="number">(19)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault18"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault18"
                        >
                          <span class="name">3 pcs</span>
                          <span class="number">(14)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault19"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault19"
                        >
                          <span class="name">
                            2 pcs Vacuum (140 g to 180 g each )
                          </span>
                          <span class="number">(13)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault20"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault20"
                        >
                          <span class="name">4 pcs</span>
                          <span class="number">(18)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault21"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault21"
                        >
                          <span class="name">
                            4 pcs Vacuum (140 g to 180 g each )
                          </span>
                          <span class="number">(07)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault22"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault22"
                        >
                          <span class="name">6 pcs</span>
                          <span class="number">(09)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault23"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault23"
                        >
                          <span class="name">6 pcs carton</span>
                          <span class="number">(11)</span>
                        </label>
                      </div>
                    </li>

                    <li>
                      <div class="form-check ps-0 m-0 category-list-box">
                        <input
                          class="checkbox_animated"
                          type="checkbox"
                          id="flexCheckDefault24"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault24"
                        >
                          <span class="name">6 pcs Pouch</span>
                          <span class="number">(16)</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
