import React, { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AddNewProduct } from "./addNewProduct";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { EditProduct } from "./editProduct";
import { PaginationBasic } from "../../components/pagination/paginationOfSeller";
import { usePaginationOfSellerContext } from "../../redux/contexts/paginationOfSeller/paginationOfSeller";
export const Product = () => {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [id, setId] = useState("");
  const [datas, setDatas] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  // const [idProduct, setIdProduct] = useState("")
  const [keySearch, setKeySearch] = useState("");
  const [store, setStore] = useState([]);
  const { page, limit, setPage } = usePaginationOfSellerContext();
  const { data, loading, error, reFetch } = useFetch(`/product/limit/${limit}`);
  const refetchData = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setDatas(data);
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      X_authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };

  const email = localStorage.getItem("users");
  const refetchAllProduct = async () => {
    var { data } = await axios.get(`/users/get/${email}`, config);
    const storeId = data.store;
    var { data } = await axios.get(`/store/getStore/${storeId}`);
    setStore(data)
    var { data } = await axios.get(`/product/`);
    setAllProducts(data);
  };
  const handleClickDelete = async (id) => {
    await axios.delete(`/product/delete/${id}/${store._id}`);
    reFetch();
  };
  const handleClickEdit = (id) => {
    setShowUpdate(true);
    setId(id);
  };

  const handleSearchKey = (key) => {
    setKeySearch(key);
  };
  const getProducts = async () => {
    const { data } = await axios.get(`/product/search/${keySearch}`);
    setAllProducts(data);
  };
  const getProductsSearchInSeller = async () => {
    let fillerProduct = {
      page: page,
      limit: limit,
      key: keySearch,
    };
    const { data } = await axios.post(`/product/seller/search/`, fillerProduct);
    setDatas(data);
  };
  useEffect(() => {
    refetchAllProduct();
  }, []);
  useEffect(() => {
    if (!show || !showUpdate) {
      reFetch();
    }
  }, [show, showUpdate]);
  useEffect(() => {
    const getAllProduct = async () => {
      let fillerProduct = {
        page: page,
        limit: limit,
        key: keySearch,
      };
      const { data } = await axios.post("/product/seller", fillerProduct);
      setDatas(data);
    };
    getAllProduct();
  }, [page]);
  useEffect(() => {
    refetchData();
  }, [loading]);

  useEffect(() => {
    getProducts();
    getProductsSearchInSeller();
  }, [keySearch]);

  return (
    <>
      <div
        class="tab-pane fade show active"
        id="pills-product"
        role="tabpanel"
        aria-labelledby="pills-product-tab"
      >
        <div class="product-tab">
          <div className="head-title">
            <div class="title">
              <h2>All Product</h2>
              <span class="title-leaf">
                <svg class="icon-width bg-gray">
                  <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
                </svg>
              </span>
            </div>
            <button
              class="addNewProduct btn btn-sm theme-bg-color text-white"
              data-bs-toggle="modal"
              onClick={() => setShow(true)}
            >
              Add New Product
            </button>
          </div>
          <div class="input-group">
            <input
              type="search"
              class="form-control"
              placeholder="I'm searching for..."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e) => handleSearchKey(e.target.value)}
            />
          </div>
          <div class="table-responsive dashboard-bg-box">
            <table class="table product-table">
              <thead>
                <tr>
                  <th scope="col">Images</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Sales</th>
                  <th scope="col">Edit / Delete</th>
                  <th scope="col">Preview</th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  <>
                    {datas.map((item, index) => (
                      <tr key={index}>
                        <td class="product-image">
                          <img src={item.photos[0]} class="img-fluid" alt="" />
                        </td>
                        <td>
                          <h6>{item.productname}</h6>
                        </td>
                        <td>
                          <h6 class="theme-color fw-bold">${item.discount}</h6>
                        </td>
                        <td>
                          <h6>{item.qualified}</h6>
                        </td>
                        <td>
                          <h6>{item.sales}</h6>
                        </td>
                        <td class="efit-delete">
                          <FiEdit
                            className="feather feather-edit edit icon-edit"
                            onClick={() => handleClickEdit(item._id)}
                          />
                          <AiOutlineDelete
                            className="feather feather-trash-2 delete icon-delete"
                            onClick={() => handleClickDelete(item._id)}
                          />
                        </td>
                        <td class="efit-delete">
                          <Link to={`/product/${item._id}`}>
                            <GrView className="feather feather-edit edit icon-edit" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
            {allProducts.length > 0 && (
              <PaginationBasic
                data={allProducts}
                setPage={setPage}
                limit={limit}
              />
            )}
          </div>
        </div>
      </div>
      {show && <AddNewProduct show={show} setShow={setShow} store={store}/>}
      {showUpdate && (
        <EditProduct show={showUpdate} setShow={setShowUpdate} id={id} store={store}/>
      )}
    </>
  );
};
