import React, { useEffect, useRef, useState } from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import { ProductLeftBox } from "../../components/commons/productLeftBox/productLeftBox";
import { TrendingProductCard } from "../../components/commons/trendingProductCard/trendingProductCard";
import { Rating } from "@mui/material";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHeadphone, BiMap, BiMinus, BiPlus } from "react-icons/bi";
import { MdShuffle } from "react-icons/md";
import banner8 from "../../assets/images/vegetable/banner/8.jpg";
import banner14 from "../../assets/images/vegetable/banner/14.jpg";
import { RelateProduct } from "../../components/relateProduct/relateProduct";
import { StickCardBox } from "../../components/commons/stickCardBox/stickCardBox";
import { BsArrowRight } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useCartContext } from "../../redux/contexts/cartContexts/cartContext.js";
import axios from "axios";
import { useCompareContext } from "../../redux/contexts/compareContext/compareContext";
import { useWishListContext } from "../../redux/contexts/wishlistContext/wishlistContext";
import { usePaginationOfSellerContext } from "../../redux/contexts/paginationOfSeller/paginationOfSeller";
import { PaginationBasic } from "../../components/pagination/paginationOfSeller";
export const ProductDetails = () => {
  const [info, setInfo] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("");
  const [store, setStore] = useState([]);
  const [topSale, setTopSale] = useState([]);
  const [userId, setUserId] = useState("");
  const [userComment, setUserComment] = useState([]);
  const [description, setDescription] = useState(true);
  const [review, setReview] = useState(false);
  const [comment, setComment] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [allComment, setAllComment] = useState([]);
  const [pageComment, setPageComment] = useState([]);
  const [star1, setStar1] = useState(0);
  const [star2, setStar2] = useState(0);
  const [star3, setStar3] = useState(0);
  const [star4, setStar4] = useState(0);
  const [star5, setStar5] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const { addToCart } = useCartContext();
  const { addToCompare } = useCompareContext();
  const { addWishlist } = useWishListContext();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/product/${id}`);
  const { page, limit, setPage } = usePaginationOfSellerContext();
  const itemWeight = useRef();
  const itemTabDes = useRef();
  const itemTabReview = useRef();
  const itemReply = useRef();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const activeLink = (element) => {
    element.classList.remove("active");
  };
  const handleClick = (item) => {
    const itemWeightActive = itemWeight.current;
    setWeight(item);
    itemWeightActive.addEventListener("click", activeLink(itemWeight.current));
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      X_authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
  const refetchAllCartByKeySearch = async () => {
    let fillerCart = {
      page: page,
      limit: limit,
    };
    const { data } = await axios.post(
      `/comment/getPageComment/${id}`,
      fillerCart
    );
    setPageComment(data);
  };
  const handleCompareClick = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`/product/${id}`);
    addToCompare(data);
    navigate("/compare");
  };
  const handleWishlistClick = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`/product/${id}`);
    addWishlist(data);
  };
  const handleClickTabDes = () => {
    const itemTabActive = itemTabDes.current;
    itemTabActive.addEventListener("click", activeLink(itemTabDes.current));
    document.querySelector("#description-tab").classList.add("active");
    document.querySelector("#review-tab").classList.remove("active");
    // document.querySelector("#description").classList.add("show active");
    setDescription(true);
    setReview(false);
  };
  const handleClickTabReview = () => {
    const itemTabActive = itemTabReview.current;
    itemTabActive.addEventListener("click", activeLink(itemTabReview.current));
    document.querySelector("#review-tab").classList.add("active");
    document.querySelector("#description-tab").classList.remove("active");
    // document.querySelector("#review").classList.add("show active");
    setDescription(false);
    setReview(true);
    checkComment();
  };
  const handleClickComment = async (e) => {
    e.preventDefault();
    try {
      const comment = {
        ...info,
        user: JSON.stringify(userComment),
        productId: id,
      };
      await axios.post("/comment/", comment);
      getRating();
    } catch (error) {
      console.log("post comment failed: " + error);
    }
  };
  const handleClickReplyComment = async (e, commentId) => {
    console.log(commentId);
    e.preventDefault();
    try {
      const comment = {
        ...info,
        user: userComment.id,
        commentId: commentId,
      };
      await axios.put("/comment/replyComment", comment);
      getRating();
    } catch (error) {
      console.log("post reply failed: " + error);
    }
  };

  const email = localStorage.getItem("users");
  const useFetchs = async () => {
    try {
      var { data } = await axios.get(`/users/get/${email}`, config);
      setUserId(data.id);
      setUserComment(data);
      const storeId = data.store;
      var { data } = await axios.get(`/store/getStore/${storeId}`);
      setStore(data);
    } catch (error) {
      throw error;
    }
  };

  const getTopSales = async () => {
    const { data } = await axios.get("/product/get/productTopSales");
    setTopSale(data);
  };
  const getRating = async () => {
    var { data } = await axios.get(`/comment/getAllComment/${id}`);
    let all = data.length;
    setAllComment(data);
    if (data.length === 0) {
      all = 1;
    }
    var { data } = await axios.get(`/comment/getRatingComment/${id}/1`);
    const one = data.length;
    setStar1((one / all).toFixed(2) * 100);
    var { data } = await axios.get(`/comment/getRatingComment/${id}/2`);
    const two = data.length;
    setStar2((two / all).toFixed(2) * 100);
    var { data } = await axios.get(`/comment/getRatingComment/${id}/3`);
    const three = data.length;
    setStar3((three / all).toFixed(2) * 100);
    var { data } = await axios.get(`/comment/getRatingComment/${id}/4`);
    const four = data.length;
    setStar4((four / all).toFixed(2) * 100);
    var { data } = await axios.get(`/comment/getRatingComment/${id}/5`);
    const five = data.length;
    setStar5((five / all).toFixed(2) * 100);
    const average = (
      (one + two * 2 + three * 3 + four * 4 + five * 5) /
      all
    ).toFixed(1);
    setAverageRating(average);
  };
  const checkComment = async () => {
    try {
      if (data.hasOwnProperty("customers")) {
        if (data.customers.length > 0) {
          let users = data.customers.filter((id) => id === userId);
          if (users.length > 0) {
            setComment(true);
          }
        }
      }
      if (data.hasOwnProperty("comments")) {
        getRating();
      }
    } catch (error) {
      console.log("check can comment: " + error);
    }
  };
  const handleClickDeleteComment = async (commentId) => {
    try {
      const comment = {
        productId: id,
      };
      await axios.delete(`/comment/deleteComment/${commentId}`);
      await axios.post(`/comment/deleteCommentInProduct/${commentId}`, comment);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      getRating();
    } catch (error) {
      console.log("delete comment failed: " + error);
    }
  };
  const handleClickDeleteReply = async (replyId, commentId) => {
    try {
      const comment = {
        commentId: commentId,
      };

      await axios.post(`/comment/deleteReplyInComment/${replyId}`, comment);
      await axios.delete(`/comment/deleteReply/${replyId}`);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      getRating();
    } catch (error) {
      console.log("delete comment failed: " + error);
    }
  };
  const handleClickUpdateComment = async (commentId) => {
    try {
      const comment = {
        ...info,
        commentId: commentId,
      };
      await axios.put("/comment/updateComment/", comment);
      getRating();
    } catch (error) {
      console.log("post comment failed: " + error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetchs();
    getTopSales();
    getRating();
    setLoadingPage(false);
    // checkComment();
  }, []);
  useEffect(() => {}, [loadingPage]);
  useEffect(() => {
    // checkComment();
    refetchAllCartByKeySearch();
  }, [page, allComment]);
  return (
    <>
      {loading && (
        <div class="fullpage-loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <BreadCrumb title="Creamy Chocolate Cake" />
      {data.hasOwnProperty("productname") && (
        <>
          <section class="product-section">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-xxl-9 col-xl-8 col-lg-7 wow fadeInUp">
                  <div class="row g-4">
                    <div class="col-xl-6 wow fadeInUp">
                      <ProductLeftBox data={data.photos} />
                    </div>

                    <div class="col-xl-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div class="right-box-contain">
                        <h6 class="offer-top">
                          {((1 - data.discount / data.price) * 100).toFixed(0)}%
                          Off
                        </h6>
                        <h2 class="name">{data.productname}</h2>
                        <div class="price-rating">
                          <h3 class="theme-color price">
                            ${data.discount}{" "}
                            <del class="text-content">${data.price}</del>{" "}
                            <span class="offer theme-color">
                              (
                              {((1 - data.discount / data.price) * 100).toFixed(
                                0
                              )}
                              % off)
                            </span>
                          </h3>
                          <div class="product-rating custom-rate">
                            <Rating
                              name="rating"
                              defaultValue={parseInt(averageRating)}
                              value={parseInt(averageRating)}
                              readOnly
                              size="small"
                            />
                            <span class="review">
                              {allComment.length} Customer Review
                            </span>
                          </div>
                        </div>

                        <div class="procuct-contain">
                          <p>{data.sortdesc}</p>
                        </div>
                        {data.weight.length > 0 && (
                          <div class="product-packege">
                            <div class="product-title">
                              <h4>Weight</h4>
                            </div>
                            <ul class="select-packege">
                              {data.weight.map((item, index) => (
                                <li>
                                  <Link
                                    key={index}
                                    class="item-weight"
                                    ref={itemWeight}
                                    onClick={() => handleClick(item)}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div class="note-box product-packege">
                          <div class="cart_qty qty-box product-qty">
                            <div class="input-group">
                              <button
                                type="button"
                                class="qty-right-plus"
                                data-type="plus"
                                data-field=""
                                onClick={() =>
                                  quantity <= data.qualified &&
                                  setQuantity(quantity + 1)
                                }
                              >
                                <BiPlus className="icon" />
                              </button>
                              <input
                                class="form-control input-number qty-input"
                                type="text"
                                name="quantity"
                                defaultValue={quantity}
                                value={quantity}
                                onChange={(e) =>
                                  quantity <= data.qualified &&
                                  setQuantity(Number(e.target.value))
                                }
                              />
                              <button
                                type="button"
                                class="qty-left-minus"
                                data-type="minus"
                                data-field=""
                                onClick={() =>
                                  quantity !== 0 && setQuantity(quantity - 1)
                                }
                              >
                                <BiMinus className="icon" />
                              </button>
                            </div>
                          </div>

                          <button
                            // onclick="location.href = 'cart.html';"
                            class="btn btn-md bg-dark cart-button text-white w-100"
                            onClick={() =>
                              addToCart(data._id, weight, quantity, data)
                            }
                          >
                            Add To Cart
                          </button>
                        </div>

                        <div class="buy-box">
                          <Link onClick={(e) => handleWishlistClick(e)}>
                            <AiOutlineHeart className="icon" />
                            <span>Add To Wishlist</span>
                          </Link>

                          <Link onClick={(e) => handleCompareClick(e)}>
                            <MdShuffle className="icon" />
                            <span>Add To Compare</span>
                          </Link>
                        </div>

                        <div class="pickup-box">
                          <div class="product-title">
                            <h4>Store Information</h4>
                          </div>

                          <div class="pickup-detail">
                            <h4 class="text-content">
                              Lollipop cake chocolate chocolate cake dessert
                              jujubes. Shortbread sugar plum dessert powder
                              cookie sweet brownie.
                            </h4>
                          </div>
                        </div>

                        <div class="paymnet-option">
                          <div class="product-title">
                            <h4>Guaranteed Safe Checkout</h4>
                          </div>
                          <ul>
                            <li>
                              <a href="javascript:void(0)">
                                <img
                                  src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/1.svg"
                                  class="blur-up lazyload"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)">
                                <img
                                  src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/2.svg"
                                  class="blur-up lazyload"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)">
                                <img
                                  src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/3.svg"
                                  class="blur-up lazyload"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)">
                                <img
                                  src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/4.svg"
                                  class="blur-up lazyload"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)">
                                <img
                                  src="https://themes.pixelstrap.com/fastkart/assets/images/product/payment/5.svg"
                                  class="blur-up lazyload"
                                  alt=""
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="product-section-box">
                        <ul
                          class="nav nav-tabs custom-nav"
                          id="myTab"
                          role="tablist"
                        >
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link active"
                              id="description-tab"
                              ref={itemTabDes}
                              onClick={() => handleClickTabDes()}
                            >
                              Description
                            </button>
                          </li>

                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link "
                              id="review-tab"
                              ref={itemTabReview}
                              onClick={() => handleClickTabReview()}
                            >
                              Review
                            </button>
                          </li>
                        </ul>

                        <div class="tab-content custom-tab" id="myTabContent">
                          {description && (
                            <div
                              class="tab-pane fade show active"
                              id="description"
                              role="tabpanel"
                              aria-labelledby="description-tab"
                            >
                              <div class="product-description">
                                <div class="nav-desh">
                                  <p>
                                    Jelly beans carrot cake icing biscuit oat
                                    cake gummi bears tart. Lemon drops carrot
                                    cake pudding sweet gummi bears. Chocolate
                                    cake tart cupcake donut topping liquorice
                                    sugar plum chocolate bar. Jelly beans
                                    tiramisu caramels jujubes biscuit liquorice
                                    chocolate. Pudding toffee jujubes oat cake
                                    sweet roll. Lemon drops dessert croissant
                                    danish cake cupcake. Sweet roll candy
                                    chocolate toffee jelly sweet roll halvah
                                    brownie topping. Marshmallow powder candy
                                    sesame snaps jelly beans candy canes
                                    marshmallow gingerbread pie.
                                  </p>
                                </div>

                                <div class="nav-desh">
                                  <div class="desh-title">
                                    <h5>Organic:</h5>
                                  </div>
                                  <p>
                                    vitae et leo duis ut diam quam nulla
                                    porttitor massa id neque aliquam vestibulum
                                    morbi blandit cursus risus at ultrices mi
                                    tempus imperdiet nulla malesuada
                                    pellentesque elit eget gravida cum sociis
                                    natoque penatibus et magnis dis parturient
                                    montes nascetur ridiculus mus mauris vitae
                                    ultricies leo integer malesuada nunc vel
                                    risus commodo viverra maecenas accumsan
                                    lacus vel facilisis volutpat est velit
                                    egestas dui id ornare arcu odio ut sem nulla
                                    pharetra diam sit amet nisl suscipit
                                    adipiscing bibendum est ultricies integer
                                    quis auctor elit sed vulputate mi sit amet
                                    mauris commodo quis imperdiet massa
                                    tincidunt nunc pulvinar sapien et ligula
                                    ullamcorper malesuada proin libero nunc
                                    consequat interdum varius sit amet mattis
                                    vulputate enim nulla aliquet porttitor lacus
                                    luctus accumsan.
                                  </p>
                                </div>

                                <div
                                  class="banner-contain nav-desh"
                                  style={{
                                    "background-image": `url(${banner14})`,
                                    "background-size": "cover",
                                    "background-position": "center center",
                                    "background-repeat": "no-repeat",
                                    display: "block",
                                  }}
                                >
                                  <img
                                    src={banner14}
                                    class="bg-img blur-up lazyload"
                                    alt=""
                                    style={{ display: "none" }}
                                  />
                                  <div class="banner-details p-center banner-b-space w-100 text-center">
                                    <div>
                                      <h6 class="ls-expanded theme-color mb-sm-3 mb-1">
                                        SUMMER
                                      </h6>
                                      <h2>VEGETABLE</h2>
                                      <p class="mx-auto mt-1">
                                        Save up to 5% OFF
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div class="nav-desh">
                                  <div class="desh-title">
                                    <h5>From The Manufacturer:</h5>
                                  </div>
                                  <p>
                                    Jelly beans shortbread chupa chups carrot
                                    cake jelly-o halvah apple pie pudding
                                    gingerbread. Apple pie halvah cake tiramisu
                                    shortbread cotton candy croissant chocolate
                                    cake. Tart cupcake caramels gummi bears
                                    macaroon gingerbread fruitcake marzipan
                                    wafer. Marzipan dessert cupcake ice cream
                                    tootsie roll. Brownie chocolate cake pudding
                                    cake powder candy ice cream ice cream cake.
                                    Jujubes soufflé chupa chups cake candy
                                    halvah donut. Tart tart icing lemon drops
                                    fruitcake apple pie.
                                  </p>

                                  <p>
                                    Dessert liquorice tart soufflé chocolate bar
                                    apple pie pastry danish soufflé. Gummi bears
                                    halvah gingerbread jelly icing. Chocolate
                                    cake chocolate bar pudding chupa chups bear
                                    claw pie dragée donut halvah. Gummi bears
                                    cookie ice cream jelly-o jujubes sweet
                                    croissant. Marzipan cotton candy gummi bears
                                    lemon drops lollipop lollipop chocolate. Ice
                                    cream cookie dragée cake sweet roll sweet
                                    roll.Lemon drops cookie muffin carrot cake
                                    chocolate marzipan gingerbread topping
                                    chocolate bar. Soufflé tiramisu pastry sweet
                                    dessert.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          {review && (
                            <div
                              class="tab-pane fade show active"
                              id="review"
                              role="tabpanel"
                              aria-labelledby="review-tab"
                            >
                              <div class="review-box">
                                <div class="row g-4">
                                  <div class="col-xl-6">
                                    <div class="review-title">
                                      <h4 class="fw-500">Customer reviews</h4>
                                    </div>

                                    <div class="d-flex">
                                      <div class="product-rating">
                                        <Rating
                                          name="half-rating-read"
                                          defaultValue={parseInt(averageRating)}
                                          value={parseInt(averageRating)}
                                          readOnly
                                          // size="small"
                                        />
                                      </div>
                                      <h6 class="ms-3">
                                        {averageRating} Out Of{" "}
                                        {allComment.length}
                                      </h6>
                                    </div>

                                    <div class="rating-box">
                                      <ul>
                                        <li>
                                          <div class="rating-list">
                                            <h5>5 Star</h5>
                                            <div class="progress">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                  width: `${star5}%`,
                                                }}
                                                aria-valuenow="100"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              >
                                                {star5}%
                                              </div>
                                            </div>
                                          </div>
                                        </li>

                                        <li>
                                          <div class="rating-list">
                                            <h5>4 Star</h5>
                                            <div class="progress">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                  width: `${star4}%`,
                                                }}
                                                aria-valuenow="100"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              >
                                                {star4}%
                                              </div>
                                            </div>
                                          </div>
                                        </li>

                                        <li>
                                          <div class="rating-list">
                                            <h5>3 Star</h5>
                                            <div class="progress">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                  width: `${star3}%`,
                                                }}
                                                aria-valuenow="100"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              >
                                                {star3}%
                                              </div>
                                            </div>
                                          </div>
                                        </li>

                                        <li>
                                          <div class="rating-list">
                                            <h5>2 Star</h5>
                                            <div class="progress">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                  width: `${star2}%`,
                                                }}
                                                aria-valuenow="100"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              >
                                                {star2}%
                                              </div>
                                            </div>
                                          </div>
                                        </li>

                                        <li>
                                          <div class="rating-list">
                                            <h5>1 Star</h5>
                                            <div class="progress">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{
                                                  width: `${star1}%`,
                                                }}
                                                aria-valuenow="100"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              >
                                                {star1}%
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div class="col-xl-6">
                                    <div class="review-title">
                                      <h4 class="fw-500">Add a review</h4>
                                    </div>

                                    <div class="row g-4 review-title">
                                      <div class="col-md-6">
                                        <div class="form-floating theme-form-floating">
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="yourName"
                                            placeholder="Name"
                                            onChange={(e) => handleChange(e)}
                                          />
                                          <label for="name">Your Name</label>
                                        </div>
                                      </div>

                                      <div class="col-md-6">
                                        <div class="form-floating theme-form-floating">
                                          <select
                                            class="form-select"
                                            id="rating"
                                            onChange={(e) => handleChange(e)}
                                          >
                                            <option selected>Choose Tag</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                          </select>
                                          <label for="email">Rating</label>
                                        </div>
                                      </div>

                                      <div class="col-12">
                                        <div class="form-floating theme-form-floating">
                                          <textarea
                                            class="form-control"
                                            placeholder="Leave a comment here"
                                            id="comment"
                                            style={{ height: "150px" }}
                                            onChange={(e) => handleChange(e)}
                                          ></textarea>
                                          <label for="comment">
                                            Write Your Comment
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      {comment ? (
                                        <button
                                          type="button"
                                          data-bs-dismiss="modal"
                                          class="btn theme-bg-color btn-md fw-bold text-light"
                                          onClick={(e) => handleClickComment(e)}
                                        >
                                          Comment
                                        </button>
                                      ) : (
                                        <h4 style={{ color: "red" }}>
                                          You have not purchased the product
                                        </h4>
                                      )}
                                    </div>
                                  </div>
                                  {pageComment.length > 0 && (
                                    <>
                                      <div class="col-12">
                                        <div class="review-title">
                                          <h4 class="fw-500">
                                            Customer questions & answers
                                          </h4>
                                        </div>
                                        <div class="review-people">
                                          <ul class="review-list">
                                            {pageComment.map((item, index) => (
                                              <li key={index}>
                                                <div class="people-box">
                                                  <div>
                                                    <div class="people-image">
                                                      <img
                                                        src={
                                                          JSON.parse(
                                                            item.user[0]
                                                          ).photos
                                                        }
                                                        class="img-fluid blur-up lazyload"
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>

                                                  <div class="people-comment">
                                                    <Link class="name">
                                                      {
                                                        JSON.parse(item.user[0])
                                                          .fullName
                                                      }
                                                    </Link>
                                                    <div class="date-time">
                                                      <h6 class="text-content">
                                                        {Date(item.createdAt)}
                                                      </h6>

                                                      <div class="product-rating">
                                                        <Rating
                                                          name="half-rating-read"
                                                          defaultValue={parseInt(
                                                            item.rating
                                                          )}
                                                          value={parseInt(
                                                            item.rating
                                                          )}
                                                          readOnly
                                                          size="small"
                                                        />
                                                      </div>
                                                    </div>

                                                    <div class="reply">
                                                      <p>
                                                        {JSON.parse(
                                                          item.user[0]
                                                        ).id === userId ? (
                                                          <>
                                                            <textarea
                                                              class="form-control"
                                                              placeholder="Leave a comment here"
                                                              id="comment"
                                                              style={{
                                                                height: "auto",
                                                              }}
                                                              defaultValue={
                                                                item.comment
                                                              }
                                                              onChange={(e) =>
                                                                handleChange(e)
                                                              }
                                                            ></textarea>
                                                          </>
                                                        ) : (
                                                          <>{item.comment}</>
                                                        )}

                                                        <Link>
                                                          {JSON.parse(
                                                            item.user[0]
                                                          ).id === userId && (
                                                            <div
                                                              onClick={() =>
                                                                handleClickUpdateComment(
                                                                  item._id
                                                                )
                                                              }
                                                            >
                                                              Edit
                                                            </div>
                                                          )}

                                                          {userComment.isAdmin && (
                                                            <>
                                                              <div
                                                                onClick={() =>
                                                                  handleClickDeleteComment(
                                                                    item._id
                                                                  )
                                                                }
                                                              >
                                                                Delete
                                                              </div>
                                                            </>
                                                          )}
                                                        </Link>
                                                      </p>
                                                    </div>
                                                    {item.reply.length > 0 && (
                                                      <>
                                                        {item.reply.map(
                                                          (
                                                            itemReply,
                                                            index
                                                          ) => (
                                                            <div
                                                              class="people-box"
                                                              key={index}
                                                            >
                                                              <div>
                                                                <div class="people-image">
                                                                  <img
                                                                    src={
                                                                      store.photos
                                                                    }
                                                                    class="img-fluid blur-up lazyload"
                                                                    alt=""
                                                                  />
                                                                </div>
                                                              </div>

                                                              <div class="people-comment">
                                                                <Link class="name">
                                                                  {
                                                                    store.storeName
                                                                  }
                                                                </Link>
                                                                <div class="date-time">
                                                                  <h6 class="text-content">
                                                                    {Date(
                                                                      JSON.parse(
                                                                        itemReply
                                                                      )
                                                                        .createdAt
                                                                    )}
                                                                  </h6>
                                                                </div>

                                                                <div class="reply">
                                                                  <p>
                                                                    {
                                                                      JSON.parse(
                                                                        itemReply
                                                                      ).comment
                                                                    }

                                                                    <Link>
                                                                      {userComment.isAdmin && (
                                                                        <>
                                                                          {/* <div
                                                                            onClick={() =>
                                                                              handleClickUpdateReply(
                                                                                JSON.parse(
                                                                                  itemReply
                                                                                )
                                                                                  ._id
                                                                              )
                                                                            }
                                                                          >
                                                                            Edit
                                                                          </div> */}
                                                                          <div
                                                                            onClick={() =>
                                                                              handleClickDeleteReply(
                                                                                JSON.parse(
                                                                                  itemReply
                                                                                )
                                                                                  .id,
                                                                                item._id
                                                                              )
                                                                            }
                                                                          >
                                                                            Delete
                                                                          </div>
                                                                        </>
                                                                      )}
                                                                    </Link>
                                                                  </p>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        )}
                                                      </>
                                                    )}
                                                    {userComment.isAdmin && (
                                                      <>
                                                        <label
                                                          for="comment"
                                                          class="review-title"
                                                        >
                                                          Reply Comment
                                                        </label>
                                                        <textarea
                                                          class="form-control review-title"
                                                          placeholder="Leave a comment here"
                                                          id="comment"
                                                          style={{
                                                            height: "auto",
                                                          }}
                                                          defaultValue={
                                                            itemReply.comment
                                                          }
                                                          onChange={(e) =>
                                                            handleChange(e)
                                                          }
                                                        ></textarea>

                                                        <button
                                                          className="btn theme-bg-color btn-md fw-bold text-light"
                                                          onClick={(e) =>
                                                            handleClickReplyComment(
                                                              e,
                                                              item._id
                                                            )
                                                          }
                                                        >
                                                          Reply
                                                        </button>
                                                      </>
                                                    )}
                                                  </div>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                      <PaginationBasic
                                        data={allComment}
                                        setPage={setPage}
                                        limit={limit}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xxl-3 col-xl-4 col-lg-5 d-none d-lg-block wow fadeInUp">
                  <div class="right-sidebar-box">
                    <div class="vendor-box">
                      <div class="verndor-contain">
                        <div class="vendor-image">
                          <img
                            src={store.photos}
                            class="blur-up lazyload"
                            alt=""
                          />
                        </div>

                        <div class="vendor-name">
                          <h5 class="fw-500">{store.storeName}</h5>

                          {/* <div class="product-rating mt-1">
                            <Rating
                              name="rating"
                              defaultValue={4}
                              readOnly
                              size="small"
                            />
                            <span>(36 Reviews)</span>
                          </div> */}
                        </div>
                      </div>

                      {/* <p class="vendor-detail">
                        Noodles & Company is an American fast-casual restaurant
                        that offers international and American noodle dishes and
                        pasta.
                      </p> */}

                      <div class="vendor-list">
                        <ul>
                          <li>
                            <div class="address-contact">
                              <BiMap className="icon feather" />
                              <h5>
                                Address:{" "}
                                <span class="text-content">
                                  {store.address}
                                </span>
                              </h5>
                            </div>
                          </li>

                          <li>
                            <div class="address-contact">
                              <BiHeadphone className="icon feather" />
                              <h5>
                                Contact Seller:{" "}
                                <span class="text-content">
                                  (+84) {store.phone}
                                </span>
                              </h5>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {topSale.length > 0 && (
                      <div class="pt-25">
                        <div class="category-menu">
                          <h3>Trending Products</h3>

                          <ul class="product-list product-right-sidebar border-0 p-0">
                            {topSale.map((item, index) => (
                              <li
                                key={index}
                                className={
                                  index === topSale.length - 1 ? "mb-0" : ""
                                }
                              >
                                <TrendingProductCard
                                  imageUrl={item.photos[0]}
                                  name={item.productname}
                                  kilo={item.weight[0]}
                                  price={item.discount}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div class="ratio_156 pt-25">
                      <div
                        class="home-contain"
                        style={{
                          "background-image": `url(${banner8})`,
                          "background-size": "cover",
                          "background-position": "center center",
                          "background-repeat": "no-repeat",
                          display: "block",
                        }}
                      >
                        <img
                          src={banner8}
                          class="bg-img blur-up lazyload"
                          alt=""
                          style={{ display: "none" }}
                        />
                        <div class="home-detail p-top-left home-p-medium">
                          <div>
                            <h6 class="text-yellow home-banner">Seafood</h6>
                            <h3 class="text-uppercase fw-normal">
                              <span class="theme-color fw-bold">Freshes</span>{" "}
                              Products
                            </h3>
                            <h3 class="fw-light">every hour</h3>
                            <button
                              onclick="location.href = 'shop-left-sidebar.html';"
                              class="btn btn-animation btn-md fw-bold mend-auto"
                            >
                              Shop Now <BsArrowRight />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {data.tags.length > 0 && <RelateProduct tag={data.tags[0]} />}

          <StickCardBox
            data={data}
            setQuantity={setQuantity}
            quantity={quantity}
          />
        </>
      )}
    </>
  );
};
