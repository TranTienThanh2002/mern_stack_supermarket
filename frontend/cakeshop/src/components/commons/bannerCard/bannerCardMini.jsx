import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
export const BannerCardMini = ({image, title, offer}) => {
  return (
    <>
      <div class="banner-contain hover-effect">
        <img
          src={image}
          class="bg-img blur-up lazyload"
          alt=""
          style={{ display: "none" }}
        />
        <div class="banner-details p-center-left p-4" style={{
                      "background-image": `url(${image})`,
                      "background-size": "cover",
                      "background-position": "center center",
                      "background-repeat": "no-repeat",
                      display: "block",
                    }}>
          <div>
            <h3 class="text-exo">{offer}</h3>
            <h4 class="text-russo fw-normal theme-color mb-2">
              {title}
            </h4>
            <button
              onclick="location.href = 'shop-left-sidebar.html';"
              class="btn btn-animation btn-sm mend-auto"
            >
              Shop Now{" "} <MdArrowRightAlt/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
