import React from "react";
import { BreadCrumb } from "../../components/commons/breadCrumb/breadCrumb";
import { useCompareContext } from "../../redux/contexts/compareContext/compareContext";
import { useCartContext } from "../../redux/contexts/cartContexts/cartContext";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { NotificationManager } from "react-notifications";
export const Compare = () => {
  const { compare, removeFromCompare } = useCompareContext();
  const { addToCart } = useCartContext();
  return (
    <>
      <BreadCrumb title="Compare" />
      <section class="compare-section section-b-space">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <div class="table-responsive">
                <table class="table compare-table">
                  <tbody>
                    {compare.length > 0 ? (
                      <>
                        <tr>
                          <th>Product</th>
                          {compare.map((item, index) => (
                            <td key={index}>
                              <Link
                                class="text-title"
                                to={`/product/${item.product._id}`}
                              >
                                {item.product.productname}
                              </Link>
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <th>Images</th>
                          {compare.map((item, index) => (
                            <td key={index}>
                              <Link
                                to={`/product/${item.product._id}`}
                                class="compare-image"
                              >
                                <img
                                  src={item.product.photos[0]}
                                  class="img-fluid blur-up lazyload"
                                  alt=""
                                />
                              </Link>
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <th>Price</th>
                          {compare.map((item, index) => (
                            <td key={index} class="price text-content">
                              ${item.product.discount}
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <th>Availability</th>
                          {compare.map((item, index) => (
                            <td key={index} class="text-content">
                              {item.product.qualified > 1
                                ? "In Stock"
                                : "Out Stock"}
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <th>Purchase</th>
                          {compare.map((item, index) => (
                            <td key={index}>
                              <button
                                onClick={() =>
                                  {addToCart(
                                    item.product._id,
                                    item.product.weight[0],
                                    1,
                                    item.product
                                  )
                                  NotificationManager.success(
                                    "Add to cart success",
                                    "Cart products",
                                    2000
                                  );
                                }
                                }
                                class=" btn-animation btn-sm w-100"
                              >
                                Add To Cart
                              </button>
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <th></th>
                          {compare.map((item, index) => (
                            <td
                              key={index}
                              onClick={() => {
                                removeFromCompare(item.product._id);
                                NotificationManager.success(
                                  "Remove success",
                                  "Compare products",
                                  2000
                                );
                              }}
                            >
                              <Link class="text-content remove_column">
                                <BsTrash /> Remove
                              </Link>
                            </td>
                          ))}
                        </tr>
                      </>
                    ) : (
                      "No item be compare"
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
