import { SET_PAGINATION } from "../../constrants/paginationOfSeller";

const paginationOfSellerReducer = (state, action) => {
  switch (action.type) {
    case SET_PAGINATION:
      return {
        ...state,
        page: action.payload,
      };

    default:
      break;
  }
};

export default paginationOfSellerReducer;
