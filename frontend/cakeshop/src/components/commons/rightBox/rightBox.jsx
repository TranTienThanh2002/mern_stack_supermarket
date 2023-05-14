import React, { useEffect, useState } from "react";
import { ProductDetails } from "../productCard/productDetails";
import { ProductImage } from "../productCard/productImage";
import { FaAngleDown, FaFilter } from "react-icons/fa";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Pagination } from "../../pagination/pagination";
import { useFillterProductContext } from "../../../redux/contexts/filterProductContext/filterProductContext";
import axios from "axios";

export const RightBox = ({
  fillterProduct,
  setLoading,
  showFilterMobile,
  setShowFilterMobile,
}) => {
  const [products, setProducts] = useState([]);
  const [datas, setDatas] = useState([]);

  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("Select Sort By");
  const [typeCol, setTypeCol] = useState("row-cols-xxl-4");
  const { tags, startPrice, endPrice, sortBy, page, limit, sortBys, setPage } =
    useFillterProductContext();
  const dropDown = () => {
    document.querySelector("button.dropdown-toggle").classList.toggle("show");
    setShow(!show);
  };
  const typeColumns = (element) => {
    document.querySelector("li.type-columns.active").classList.remove("active");
    document.querySelector(`li.${element}`).classList.add("active");
  };
  const { data, loading, error, reFetch } = useFetch("https://super-market-2ebn.onrender.com/api/product");
  const handleFillter = async (string) => {
    if (string === "Low - High Price") {
      sortBys({
        tag: "price",
        sort: 1,
      });
    } else if (string === "High - Low Price") {
      sortBys({
        tag: "price",
        sort: -1,
      });
    } else if (string === "A - Z Order") {
      sortBys({
        tag: "productname",
        sort: 1,
      });
    } else if (string === "Z - A Order") {
      sortBys({
        tag: "productname",
        sort: -1,
      });
    } else {
      sortBys({
        tag: "_id",
        sort: 1,
      });
    }
  };
  useEffect(() => {
    if (tags.length === 0) {
      const getPageProducts = async () => {
        let fillerProduct = {
          page: page,
          limit: limit,
        };
        const { data } = await axios.post(
          "https://super-market-2ebn.onrender.com/api/product/getPageProducts",
          fillerProduct
        );
        setDatas(data);
      };
      // eslint-disable-next-line react-hooks/rules-of-hooks
      setProducts(data);
      getPageProducts();
    }
  }, [loading]);
  useEffect(() => {
    const getfillTerAllProducts = async () => {
      const filterProduct = {
        tags: tags,
        sortBy: sortBy,
        endPrice: endPrice,
        startPrice: startPrice,
        page: page,
        limit: limit,
      };
      const { data } = await axios.post(
        "https://super-market-2ebn.onrender.com/api/product/fillTerAllProducts",
        filterProduct
      );
      setProducts(data);
    };
    getfillTerAllProducts();
    setDatas(fillterProduct);
  }, [fillterProduct]);
  useEffect(() => {
    const sort = async () => {
      const fillterProduct = {
        tags: tags,
        sortBy: sortBy,
        endPrice: endPrice,
        startPrice: startPrice,
        page: page,
        limit: limit,
      };
      if (sortBy.sortBy["tag"] === "productname") {
        var { data } = await axios.post("https://super-market-2ebn.onrender.com/api/product/filter/name", fillterProduct);
        setDatas(data);
        var { data } = await axios.post(
          "https://super-market-2ebn.onrender.com/api/product/filter/fillTerAllProductsSortName",
          fillterProduct
        );
        setProducts(data);
      } else if (sortBy.sortBy["tag"] === "price") {
        var { data } = await axios.post(
          "https://super-market-2ebn.onrender.com/api/product/filter/price",
          fillterProduct
        );
        setDatas(data);
        var { data } = await axios.post(
          "https://super-market-2ebn.onrender.com/api/product/filter/fillTerAllProductsSortPrice",
          fillterProduct
        );
        setProducts(data);
      } else {
        var { data } = await axios.post("https://super-market-2ebn.onrender.com/api/product/filter/", fillterProduct);
        setDatas(data);
        var { data } = await axios.post(
          "https://super-market-2ebn.onrender.com/api/product/fillTerAllProducts/",
          fillterProduct
        );
        setProducts(data);
      }
    };
    sort();
    setLoading(true);
  }, [sortBys, page]);
  return (
    <>
      <div class="show-button">
        <div class="filter-button-group mt-0">
          <div class="filter-button d-inline-block d-lg-none">
            <Link
              style={{ color: "#fff" }}
              onClick={(e) => {
                e.preventDefault();
                setShowFilterMobile(true);
              }}
            >
              <FaFilter /> Filter Menu
            </Link>
          </div>
        </div>

        <div class="top-filter-menu">
          <div class="category-dropdown">
            <h5 class="text-content">Sort By :</h5>
            <div class="dropdown">
              <button
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                onClick={dropDown}
              >
                <span>{filter}</span> <FaAngleDown />
              </button>
              <ul
                class={show ? "dropdown-menu show" : "dropdown-menu"}
                aria-labelledby="dropdownMenuButton1"
              >
                <li
                  onClick={() => {
                    setFilter("Popularity");
                    handleFillter("Popularity");
                    dropDown();
                  }}
                >
                  <Link class="dropdown-item" id="pop">
                    Popularity
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setFilter("Low - High Price");
                    handleFillter("Low - High Price");
                    dropDown();
                  }}
                >
                  <Link class="dropdown-item" id="low">
                    Low - High Price
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setFilter("High - Low Price");
                    handleFillter("High - Low Price");
                    dropDown();
                  }}
                >
                  <Link class="dropdown-item" id="high">
                    High - Low Price
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setFilter("Average Rating");
                    handleFillter("Average Rating");
                    dropDown();
                  }}
                >
                  <Link class="dropdown-item" id="rating">
                    Average Rating
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setFilter("A - Z Order");
                    handleFillter("A - Z Order");
                    dropDown();
                  }}
                >
                  <Link class="dropdown-item" id="aToz">
                    A - Z Order
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setFilter("Z - A Order");
                    handleFillter("Z - A Order");
                    dropDown();
                  }}
                >
                  <Link class="dropdown-item" id="zToa">
                    Z - A Order
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setFilter("% Off - Hight To Low");
                    handleFillter("% Off - Hight To Low");
                    dropDown();
                  }}
                >
                  <Link class="dropdown-item" id="off">
                    % Off - Hight To Low
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div class="grid-option d-none d-md-block">
            <ul>
              <li
                class="three-grid type-columns"
                onClick={(e) => {
                  typeColumns("three-grid");
                  setTypeCol("");
                }}
              >
                <Link>
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/grid-3.svg"
                    class="blur-up lazyload"
                    alt=""
                  />
                </Link>
              </li>
              <li
                class="grid-btn d-xxl-inline-block type-columns active d-sm-none"
                onClick={(e) => {
                  typeColumns("grid-btn");
                  setTypeCol("row-cols-xxl-4");
                }}
              >
                <Link>
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/grid-4.svg"
                    class="blur-up lazyload d-lg-inline-block "
                    alt=""
                  />
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/grid.svg"
                    class="blur-up lazyload img-fluid d-lg-none d-inline-block"
                    alt=""
                  />
                </Link>
              </li>
              <li
                class="list-btn type-columns"
                onClick={(e) => {
                  typeColumns("list-btn");
                  setTypeCol("list-style");
                }}
              >
                <Link>
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/svg/list.svg"
                    class="blur-up lazyload"
                    alt=""
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class={`row g-sm-4 g-3 product-list-section ${typeCol} row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2`}
      >
        {datas.length > 0 ? (
          <>
            {datas.map((item, index) => (
              <div key={index}>
                <div class="product-box-3 h-100 wow fadeInUp">
                  <div class="product-header">
                    <ProductImage imageUrl={item.photos[0]} id={item._id} />
                  </div>
                  <div class="product-footer">
                    <ProductDetails
                      item={item}
                      spanName={item.tags[0]}
                      name={item.productname}
                      priceNew={item.discount}
                      priceOld={item.price}
                      background="bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          "No Items"
        )}
      </div>

      <Pagination data={products} setPage={setPage} limit={limit} />
    </>
  );
};
