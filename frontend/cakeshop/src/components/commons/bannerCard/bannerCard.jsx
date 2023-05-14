import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useFillterProductContext } from "../../../redux/contexts/filterProductContext/filterProductContext";
export const BannerCard = ({banner, sale, title,content,category}) => {
  const { addTag,tags,removeTag } = useFillterProductContext();
  const navigate = useNavigate()
  const handleClickCategories = (e) => {
    e.preventDefault();
    if(tags.length > 0) {
      tags.map(item => removeTag(item))
    }
    addTag(category)
    navigate('/shop')
    
  }
  return (
    <div>
      <div class="banner-contain hover-effect">
        <img src={banner} class="bg-img blur-up lazyload" alt="" />
        <div class="banner-details">
          <div class="banner-box">
            <h6 class="text-danger">{sale}</h6>
            <h5>{title}</h5>
            <h6 class="text-content">{content}</h6>
          </div>
          <Link onClick={(e)=>handleClickCategories(e)} class="banner-button text-white">
            Shop Now <MdArrowRightAlt/>
          </Link>
        </div>
      </div>
    </div>
  );
};
