import React, { useEffect, useState } from "react";
import { useCartContext } from "../../redux/contexts/cartContexts/cartContext";
import { CartItems } from "../../components/cartItems/cartItems";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cart, setTotalItems, fee_shipping } = useCartContext();
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const subTotalItem = () => {
      let total = 0;
      cart.map((item) => {
        return (total += item.product.discount * item.amount);
      });
      setSubTotal(total);
      setTotalItems(total);
    };
    subTotalItem();
    setLoading(true)
  }, [loading]);
  return (
    <>
      {!loading && (
        <div class="fullpage-loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <BreadCrumb title="Cart" />
      <section className="cart-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-5 g-3">
            {cart.length > 0 ? (
              <>
                <div className="col-xxl-9">
                  <div className="cart-table">
                    <div className="table-responsive-xl">
                      <table className="table">
                        <tbody>
                          {cart.map((item, index) => (
                            <CartItems
                              key={index}
                              item={item}
                              subTotal={subTotal}
                              setSubTotal={setSubTotal}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3">
                  <div className="summery-box p-sticky">
                    <div className="summery-header">
                      <h3>Cart Total</h3>
                    </div>

                    <div className="summery-contain">
                      {/* <div className="coupon-cart">
                        <h6 className="text-content mb-2">Coupon Apply</h6>
                        <div className="mb-3 coupon-box input-group">
                          <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Coupon Code Here..."
                          />
                          <button className="btn-apply">Apply</button>
                        </div>
                      </div> */}
                      <ul>
                        <li>
                          <h4>Subtotal</h4>
                          <h4 className="price">${subTotal.toFixed(1)}</h4>
                        </li>

                        {/* <li>
                          <h4>Coupon Discount</h4>
                          <h4 className="price">(-) 0.00</h4>
                        </li> */}

                        <li className="align-items-start">
                          <h4>Shipping</h4>
                          <h4 className="price text-end">${fee_shipping}</h4>
                        </li>
                      </ul>
                    </div>

                    <ul className="summery-total">
                      <li className="list-total border-top-0">
                        <h4>Total (USD)</h4>
                        <h4 className="price theme-color">
                          ${(subTotal + fee_shipping).toFixed(1)}
                        </h4>
                      </li>
                    </ul>

                    <div className="button-group cart-button">
                      <ul>
                        <li>
                          <button
                            onClick={()=>navigate('/checkout')}
                            className="btn btn-animation proceed-btn fw-bold"
                          >
                            Process To Checkout
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={()=>navigate('/')}
                            className="btn btn-light shopping-button text-dark"
                          >
                            <i className="fa-solid fa-arrow-left-long"></i>
                            Return To Shopping
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              "No Cart In Item"
            )}
          </div>
        </div>
      </section>
    </>
  );
};
