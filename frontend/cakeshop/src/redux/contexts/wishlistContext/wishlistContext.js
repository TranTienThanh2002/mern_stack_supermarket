import { createContext, useContext, useEffect, useReducer } from "react";
import wishlistReducer from "../../reducers/wishlistReducer/wishlistReducer";
import {
  ADD_ITEM_TO_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
} from "../../constrants/wishlistConstrant";

const WishlistContext = createContext();
const getLocalWishlistItemsData = () => {
  let localWishlistItemsData = localStorage.getItem("WishlistItems");
  if (localWishlistItemsData === [] || localWishlistItemsData == null) {
    return [];
  } else return JSON.parse(localWishlistItemsData);
};
const initialState = {
  wishlistItems: getLocalWishlistItemsData(),
};
const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const addWishlist = (product) => {
    dispatch({
      type: ADD_ITEM_TO_WISHLIST,
      payload: { product },
    });
  };

  const removeWishlist = (id) => {
    dispatch({
      type: REMOVE_ITEM_FROM_WISHLIST,
      payload: { id },
    });
  };
  useEffect(() => {
    localStorage.setItem("WishlistItems", JSON.stringify(state.wishlistItems));
  }, [state.wishlistItems]);
  return (
    <>
      <WishlistContext.Provider
        value={{
          ...state,
          addWishlist,
          removeWishlist,
        }}
      >
        {children}
      </WishlistContext.Provider>
    </>
  );
};

const useWishListContext = () => {
  return useContext(WishlistContext);
};

export { WishlistProvider, useWishListContext };
