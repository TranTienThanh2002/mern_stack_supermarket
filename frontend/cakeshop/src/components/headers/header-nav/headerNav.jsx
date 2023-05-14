import React from "react";
import { BsLightningCharge } from "react-icons/bs";
import {AiOutlineBars} from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import { useFillterProductContext } from "../../../redux/contexts/filterProductContext/filterProductContext";
export const HeaderNav = ({showNavBarMobile, setShowNavBarMobile}) => {
  const { addTag,tags,removeTag } = useFillterProductContext();
  const navigate = useNavigate()
  const handleClickCategories = (e, category) => {
    e.preventDefault();
    if(tags.length > 0) {
      tags.map(item => removeTag(item))
    }
    addTag(category)
    navigate('/shop')
    
  }
  return (
    <>
      <div class="header-nav">
        <div class="header-nav-left">
          <button class="dropdown-category">
            <AiOutlineBars className="feather feather-align-left"/>
            <span>All Categories</span>
          </button>

          <div class="category-dropdown">
            <div class="category-title">
              <h5>Categories</h5>
              <button type="button" class="btn p-0 close-button text-content">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <ul class="category-list">
              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "vegetable")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/vegetable.svg"
                    alt=""
                  />
                  <h6>Vegetables & Fruit</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>

              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "beverage")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/cup.svg"
                    alt=""
                  />
                  <h6>Beverages</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>

              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "meats")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/meats.svg"
                    alt=""
                  />
                  <h6>Meats & Seafood</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>

              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "breakfast")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/breakfast.svg"
                    alt=""
                  />
                  <h6>Breakfast & Dairy</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>

              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "frozen")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/frozen.svg"
                    alt=""
                  />
                  <h6>Frozen Foods</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>

              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "biscuits")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/biscuit.svg"
                    alt=""
                  />
                  <h6>Biscuits & Snacks</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>

              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "grocery")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/grocery.svg"
                    alt=""
                  />
                  <h6>Grocery & Staples</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>
              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "wines")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/drink.svg"
                    alt=""
                  />
                  <h6>Wines & Alcohol Drink</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>
              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "milk")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/milk.svg"
                    alt=""
                  />
                  <h6>Milk & Dairies</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>
              <li class="onhover-category-list">
                <Link onClick={(e)=>handleClickCategories(e, "pet")} class="category-name">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/1/pet.svg"
                    alt=""
                  />
                  <h6>Pet Foods</h6>
                  <i class="fa-solid fa-angle-right"></i>
                </Link>

                
              </li>
            </ul>
          </div>
        </div>

        <div class="header-nav-middle">
          <div class="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
            <div
              class={showNavBarMobile ? "offcanvas offcanvas-collapse order-xl-2 show" : "offcanvas offcanvas-collapse order-xl-2"}
              id="primaryMenu"
            >
              <div class="offcanvas-header navbar-shadow">
                <h5>Menu</h5>
                <button
                  class="btn-close lead"
                  type="button"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={()=>setShowNavBarMobile(false)}
                ></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" to="/">
                      Home
                    </Link>
                  </li>

                  <li class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle "
                      to="/shop"
                      data-bs-toggle="dropdown"
                    >
                      Shop
                    </Link>
                  </li>
                  <li class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle "
                      to="/contact"
                      data-bs-toggle="dropdown"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle "
                      to="/wishlist"
                      data-bs-toggle="dropdown"
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle "
                      to="/compare"
                      data-bs-toggle="dropdown"
                    >
                      Compare
                    </Link>
                  </li>

                  
                </ul>
              </div>
             
            </div>
            <div class={showNavBarMobile ? "offcanvas-backdrop fade show":"offcanvas-backdrop fade hide-offcanvas"} style={{zIndex: "1"}}></div>
          </div>
        </div>

        <div class="header-nav-right">
          <button
            class="btn deal-button"
            data-bs-toggle="modal"
            data-bs-target="#deal-box"
          >
            <BsLightningCharge />
            <span>Deal Today</span>
          </button>
        </div>
      </div>
    </>
  );
};
