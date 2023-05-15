import React from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import { Link } from "react-router-dom";
import { useWishListContext } from "../../redux/contexts/wishlistContext/wishlistContext";
import { ProductDetails } from "../../components/commons/productCard/productDetails";
import { MdClose } from "react-icons/md";
import Slider from "react-slick";
import { NotificationManager } from "react-notifications";
export const Wishlist = () => {
  const { wishlistItems, removeWishlist } = useWishListContext();

  var settings = {
    dots: true,
    infinite: wishlistItems.length > 6,
    // speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <BreadCrumb title="Wishlist" />
      <section class="wishlist-section section-b-space">
        <div class="product-wrapper container-fluid-lg">
          <div class="row g-sm-3 g-2">
            {wishlistItems.length > 0 ? (
              <>
                <Slider {...settings}>
                  {wishlistItems.map((item, index) => (
                    <div
                      class="col-xxl-2 col-lg-3 col-md-4 col-6 product-box-contain"
                      key={index}
                    >
                      <div class="product-box-3 h-100">
                        <div class="product-header">
                          <div class="product-image">
                            <Link>
                              <img
                                src={item.product.photos[0]}
                                class="img-fluid blur-up lazyload"
                                alt=""
                              />
                            </Link>

                            <div class="product-header-top">
                              <button class="btn wishlist-button close_button">
                                <MdClose
                                  onClick={() =>
                                    {removeWishlist(item.product._id)
                                      NotificationManager.success(
                                        "Remove success",
                                        "Wishlist products",
                                        2000
                                      );
                                    }
                                  }
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="product-footer">
                          <ProductDetails
                            item={item.product}
                            spanName={item.product.tags[0]}
                            name={item.product.productname}
                            priceNew={item.product.discount}
                            priceOld={item.product.price}
                            background="bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
            ) : (
              "No item in wishlist"
            )}
          </div>
        </div>
      </section>
    </>
  );
};
