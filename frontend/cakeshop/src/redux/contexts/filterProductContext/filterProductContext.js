import { createContext, useContext, useReducer } from "react";
import {
  ADD_RATING,
  ADD_TAG,
  END_PRICE,
  KEY_SEARCH,
  REMOVE_RATING,
  REMOVE_TAG,
  SET_PAGES,
  SORT_BY,
  START_PRICE,
} from "../../constrants/filterProductConstrant";
import fillterProductReducer from "../../reducers/filterProductReducer/filterProductReducer";

const initialState = {
  tags: [],
  foodPreferences: [],
  startPrice: "",
  endPrice: "",
  rating: [],
  discount: [],
  packSize: [],
  sortBy: { tag: "_id", sort: 1 },
  page: 1,
  limit: 12,
  key: "",
};

const FillterProductContext = createContext();

const FillterProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fillterProductReducer, initialState);

  const addTag = (tag) => {
    dispatch({
      type: ADD_TAG,
      payload: tag,
    });
  };

  const removeTag = (tag) => {
    dispatch({
      type: REMOVE_TAG,
      payload: tag,
    });
  };
  const addRating = (rating) => {
    dispatch({
      type: ADD_RATING,
      payload: rating,
    });
  };

  const removeRating = (rating) => {
    dispatch({
      type: REMOVE_RATING,
      payload: rating,
    });
  };
  const sortBys = (sortBy) => {
    dispatch({
      type: SORT_BY,
      payload: { sortBy },
    });
  };
  const startPrices = (startPrice) => {
    dispatch({
      type: START_PRICE,
      payload: startPrice,
    });
  };
  const endPrices = (endPrice) => {
    dispatch({
      type: END_PRICE,
      payload: endPrice,
    });
  };
  const setPage = (page) => {
    dispatch({
      type: SET_PAGES,
      payload: page,
    });
  };
  const setRating = (rating) => {
    dispatch({
      type: ADD_RATING,
      payload: rating,
    });
  };
  const setKey = (key) => {
    dispatch({
      type: KEY_SEARCH,
      payload: key,
    });
  };
  return (
    <>
      <FillterProductContext.Provider
        value={{
          ...state,
          addTag,
          removeTag,
          sortBys,
          startPrices,
          endPrices,
          setPage,
          setKey,
          setRating,
          removeRating,
          addRating
        }}
      >
        {children}
      </FillterProductContext.Provider>
    </>
  );
};

const useFillterProductContext = () => {
  return useContext(FillterProductContext);
};

export { FillterProductProvider, useFillterProductContext };
