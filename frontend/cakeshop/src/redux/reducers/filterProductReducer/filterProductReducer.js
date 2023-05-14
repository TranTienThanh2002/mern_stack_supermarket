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

const fillterProductReducer = (state, action) => {
  switch (action.type) {
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case REMOVE_TAG:
      let updateTags = state.tags.filter((tag) => tag !== action.payload);
      return {
        ...state,
        tags: updateTags,
      };
    case ADD_RATING:
      return {
        ...state,
        rating: [...state.rating, action.payload],
      };
    case REMOVE_RATING:
      let updateRating = state.rating.filter((rating) => rating !== action.payload);
      return {
        ...state,
        rating: updateRating,
      };
    case START_PRICE:
      return {
        ...state,
        startPrice: action.payload,
      };
    case END_PRICE:
      return {
        ...state,
        endPrice: action.payload,
      };
    case SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_PAGES:
      return {
        ...state,
        page: action.payload,
      };
    
    case KEY_SEARCH:
      return {
        ...state,
        key: action.payload,
      };
    default:
      break;
  }
};

export default fillterProductReducer;
