import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../../reducers/cartReducer/cartReducer.js";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SET_DECREMENT,
  SET_INCREMENT,
  TOTAL_ITEMS,
} from "../../constrants/cartConstrant.js";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("CartStore");
  if (localCartData === [] || localCartData == null) {
    return [];
  } else return JSON.parse(localCartData);
};

const initialState = {
  cart: getLocalCartData(),
  total_items: "",
  total_amount: "",
  fee_shipping: 6.9
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (id, weight, amount, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, weight, amount, product },
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: { id },
    });
  };

  const setIncrement = (id) => {
    dispatch({ type: SET_INCREMENT, payload: id });
  };
  const setDecrement = (id) => {
    dispatch({ type: SET_DECREMENT, payload: id });
  };

  const setTotalItems = (val) => {
    dispatch({ type: TOTAL_ITEMS, payload: val });
  };

  useEffect(() => {
    localStorage.setItem("CartStore", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <>
      <CartContext.Provider
        value={{
          ...state,
          addToCart,
          removeItem,
          setIncrement,
          setDecrement,
         setTotalItems,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
