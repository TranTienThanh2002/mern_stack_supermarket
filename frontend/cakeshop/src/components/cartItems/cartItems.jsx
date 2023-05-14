import React, {  useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useCartContext } from "../../redux/contexts/cartContexts/cartContext";
import { Link } from "react-router-dom";

export const CartItems = ({ item,subTotal, setSubTotal }) => {
  const [quantity, setQuantity] = useState(Number(item.amount));
  const {removeItem, setTotalItems} = useCartContext()
  const plusAmount = (item) => {
    item.amount += 1;
    setQuantity(item.amount);
    setSubTotal(subTotal + item.product.discount)
    setTotalItems(((subTotal + item.product.discount).toFixed(1)))
  };
  const minusAmount = (item) => {
    item.amount -= 1;
    
    setQuantity(item.amount);
    
    setSubTotal(subTotal - item.product.discount)
    setTotalItems((subTotal - item.product.discount).toFixed(1))
  };
  const toggledAmount = (amount, item) => {
    item.amount = amount;
    if(amount< quantity){
        setSubTotal(subTotal - (quantity - amount) * item.product.discount)
        setTotalItems((subTotal - (quantity - amount) * item.product.discount).toFixed(1))
        setQuantity(item.amount);
    }
    else {
        setSubTotal(subTotal + (amount-quantity) * item.product.discount)
        setTotalItems((subTotal + (amount-quantity) * item.product.discount).toFixed(1))
        setQuantity(item.amount);
    }
    
    
  };
  const reMoveItemHandles = (id, item)=>{
    setSubTotal(subTotal - (item.product.discount*item.amount));
    removeItem(id);
  }
  //   useEffect(()=>{},[quantity])
  return (
    <>
      <tr className="product-box-contain">
        <td className="product-detail">
          <div className="product border-0">
            <a href="product-left-thumbnail.html" className="product-image">
              <img
                src={item.product.photos[0]}
                className="img-fluid blur-up lazyload"
                alt=""
              />
            </a>
            <div className="product-detail">
              <ul>
                <li className="name">
                  <a href="product-left-thumbnail.html">
                    {item.product.productname}
                  </a>
                </li>

                <li className="text-content">
                  <span className="text-title">Quantity</span> {item.weight}
                </li>
              </ul>
            </div>
          </div>
        </td>

        <td className="price">
          <h4 className="table-title text-content">Price</h4>
          <h5>
            ${item.product.discount}{" "}
            <del className="text-content">${item.product.price}</del>
          </h5>
          <h6 className="theme-color">
            You Save : $
            {(item.product.price - item.product.discount).toFixed(1)}
          </h6>
        </td>

        <td className="quantity">
          <h4 className="table-title text-content">Qty</h4>
          <div className="quantity-price">
            <div className="cart_qty">
              <div className="input-group">
                <button
                  type="button"
                  class="qty-right-plus"
                  data-type="plus"
                  data-field=""
                  onClick={() =>
                    quantity < item.product.qualified && plusAmount(item)
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
                    item.amount < item.product.qualified &&
                    toggledAmount(Number(e.target.value), item)
                  }
                />
                <button
                  type="button"
                  class="qty-left-minus"
                  data-type="minus"
                  data-field=""
                  onClick={() => quantity !== 0 && minusAmount(item)}
                >
                  <BiMinus className="icon" />
                </button>
              </div>
            </div>
          </div>
        </td>

        <td className="subtotal">
          <h4 className="table-title text-content">Total</h4>
          <h5>${(quantity * item.product.discount).toFixed(1)}</h5>
        </td>

        <td className="save-remove">
          <h4 className="table-title text-content">Action</h4>
          <Link className="remove close_button" onClick={()=>reMoveItemHandles(item.id, item)}>
            Remove
          </Link>
        </td>
      </tr>
    </>
  );
};
