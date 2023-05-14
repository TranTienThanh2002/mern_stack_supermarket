import {
  ADD_ITEM_TO_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
} from "../../constrants/wishlistConstrant";

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_WISHLIST:
      let checkVisited = false;
      if (state.wishlistItems.length > 0) {
        let product = state.wishlistItems.map((item) => {
          if (item.product._id === action.payload.product._id) {
            checkVisited = true;
          }
          return item;
        });
        if (checkVisited) {
          return {
            ...state,
            wishlistItems: product,
          };
        } else {
          return {
            ...state,
            wishlistItems: [...state.wishlistItems, action.payload],
          };
        }
      }
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };

    case REMOVE_ITEM_FROM_WISHLIST:
      let updateWishlistItems = state.wishlistItems.filter(
        (currItem) => currItem.product._id !== action.payload.id
      );
      return {
        ...state,
        wishlistItems: updateWishlistItems,
      };
    default:
      break;
  }
};

export default wishlistReducer;
