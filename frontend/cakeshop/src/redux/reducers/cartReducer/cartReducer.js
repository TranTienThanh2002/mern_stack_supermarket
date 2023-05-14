import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SET_DECREMENT,
  SET_INCREMENT,
  TOTAL_ITEMS,
} from "../../constrants/cartConstrant";

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // let {id, weight, amount, product} = action.payload;
      let checkVisited = false;
      let product = state.cart.map((item) => {
        if (item.product._id === action.payload.id) {
          let newAmount = item.amount + action.payload.amount;
          checkVisited = true;
          return {
            ...item,
            amount: newAmount,
          };
        }
        return item;
      });
      if (checkVisited) {
        return {
          ...state,
          cart: product,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case REMOVE_ITEM:
      let updateCart = state.cart.filter(
        (curItem) => curItem.product._id !== action.payload.id
      );
      return { ...state, cart: updateCart };
    case SET_DECREMENT:
      let updateAmountOfProduct = state.cart.map((item) => {
        if (item.product._id === action.payload.id) {
          let decrement = item.amount - 1;
          if (decrement <= 1) decrement = 1;
          return {
            ...item,
            amount: decrement,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updateAmountOfProduct,
      };
    case SET_INCREMENT:
      let updateAmountProduct = state.cart.map((item) => {
        if (item.product._id === action.payload.id) {
          let increment = item.amount + 1;
          if (increment === item.product.qualified) increment = item.product.qualified;
          return {
            ...item,
            amount: increment,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updateAmountProduct,
      };
    case TOTAL_ITEMS:
      // let updateTotalItem = state.cart.reduce((prev, curItem) => {
      //   let { amount } = curItem;
      //   prev = prev + amount;
      //   return prev;
      // }, 0);
      return {
        ...state,
        total_items: action.payload,
      };
    default:
      break;
  }
};
export default cartReducer;
