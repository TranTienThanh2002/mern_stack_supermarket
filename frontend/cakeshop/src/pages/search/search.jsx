import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import axios from "axios";
import { ProductImage } from "../../components/commons/productCard/productImage";
import { ProductDetails } from "../../components/commons/productCard/productDetails";
import { useFillterProductContext } from "../../redux/contexts/filterProductContext/filterProductContext";
import { PaginationBasic } from "../../components/pagination/paginationOfSeller";
import { usePaginationSearchContext } from "../../redux/contexts/paginationSearch/paginationSearch";
import useFetch from "../../hooks/useFetch";

export const Search = () => {
  const { key, setKey } = useFillterProductContext();
  const [products, setProducts] = useState([]);
  const [datas, setDatas] = useState([]);
  const { page, limit, setPage } = usePaginationSearchContext();
  const { data, loading, error, reFetch } = useFetch(
    `https://super-market-2ebn.onrender.com/api/product/limitSearch/${limit}/${key}`
  );
  const refetchData = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setDatas(data);
  };
  const getProducts = async () => {
    const { data } = await axios.get(`https://super-market-2ebn.onrender.com/api/product/search/${key}`);
    setProducts(data);
  };
  const handleSearchKey = (key) => {
    setKey(key);
  };
  useEffect(() => {
    refetchData();
  }, [loading]);
  useEffect(() => {
    getProducts();
  }, [key]);
  useEffect(() => {
    const getAllProduct = async () => {
      let fillerProduct = {
        page: page,
        limit: limit,
        key: key,
      };
      const { data } = await axios.post("https://super-market-2ebn.onrender.com/api/product/searchByKey", fillerProduct);
      setDatas(data);
    };
    getAllProduct();
  }, [page]);
  return (
    <>
      <BreadCrumb title="Search" />
      <section class="search-section d-md-none">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-xxl-6 col-xl-8 mx-auto">
              <div class="title d-block text-center">
                <h2>Search for products</h2>
                <span class="title-leaf">
                  <svg class="icon-width">
                    <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
                  </svg>
                </span>
              </div>

              <div class="search-box" style={{ zIndex: "0" }}>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder=""
                    aria-label="Example text with button addon"
                    
                    onChange={(e) => handleSearchKey(e.target.value)}
                  />
                  <button
                    class="btn theme-bg-color text-white m-0"
                    type="button"
                    id="button-addon1"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-b-space search-section">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <div class="search-product product-wrapper">
                <div
                  class={`row g-sm-4 g-3 product-list-section row-cols-xxl-5 row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-2`}
                >
                  {datas.length > 0 ? (
                    <>
                      {datas.map((item, index) => (
                        <div>
                          <div key={index}>
                            <div class="product-box-3 h-100 wow fadeInUp">
                              <div class="product-header">
                                <ProductImage
                                  imageUrl={item.photos[0]}
                                  id={item._id}
                                />
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
                        </div>
                      ))}
                    </>
                  ) : (
                    <>No items</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {products.length > 0 && (
          <PaginationBasic data={products} setPage={setPage} limit={limit} />
        )}
      </section>
    </>
  );
};
