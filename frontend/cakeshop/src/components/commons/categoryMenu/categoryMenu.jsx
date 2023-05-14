import React from "react";
import { useFillterProductContext } from "../../../redux/contexts/filterProductContext/filterProductContext";
import { Link, useNavigate } from "react-router-dom";

export const CategoryMenu = () => {
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
      <div class="category-menu">
        <h3>Category</h3>
        <ul>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/vegetable.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e, "vegetable")}>Vegetables & Fruit</Link>
              </h5>
            </div>
          </li>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/cup.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"beverage")}>Beverages</Link>
              </h5>
            </div>
          </li>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/meats.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"meats")}>Meats & Seafood</Link>
              </h5>
            </div>
          </li>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/breakfast.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"breakfast")}>Breakfast & Dairy</Link>
              </h5>
            </div>
          </li>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/frozen.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"frozen")}>Frozen Foods</Link>
              </h5>
            </div>
          </li>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/biscuit.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"biscuits")}>Biscuits & Snacks</Link>
              </h5>
            </div>
          </li>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/grocery.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"grocery")}>Grocery & Staples</Link>
              </h5>
            </div>
          </li>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/drink.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"wines")}>Wines & Alcohol Drinks</Link>
              </h5>
            </div>
          </li>
          <li>
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/milk.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"milk")}>Milk & Dairies</Link>
              </h5>
            </div>
          </li>
          <li class="pb-30">
            <div class="category-list">
              <img
                src="https://themes.pixelstrap.com/fastkart/assets/svg/1/pet.svg"
                class="blur-up lazyload"
                alt=""
              />
              <h5>
                <Link onClick={(e)=>handleClickCategories(e,"pet")}>Pet Foods</Link>
              </h5>
            </div>
          </li>
        </ul>

        
      </div>
    </>
  );
};
