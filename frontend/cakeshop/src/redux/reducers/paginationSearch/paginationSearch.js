import { SET_PAGINATION_SEARCH } from "../../constrants/paginationSearch";


const paginationSearchReducer = (state, action) => {
    switch (action.type) {
      case SET_PAGINATION_SEARCH:
        return {
          ...state,
          page: action.payload,
        };
  
      default:
        break;
    }
  };
  
  export default paginationSearchReducer;