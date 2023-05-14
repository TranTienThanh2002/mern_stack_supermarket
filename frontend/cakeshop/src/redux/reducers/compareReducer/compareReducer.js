import {
  ADD_TO_COMPARE,
  REMOVE_COMPARE,
} from "../../constrants/compareConstrant";

const compareReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_COMPARE:
      let checkVisited = false;
      if (state.compare.length > 0){
        let product = state.compare.map((item) => {

          if (item.product._id === action.payload.product._id) {
            
            checkVisited = true;
          }
          return item;
        });
        if (checkVisited) {
          return {
            ...state,
            compare: product,
          };
        } else {
          return {
            
            ...state,
            compare: [...state.compare, action.payload],
          };
        }
      }
      else {
        return {
          ...state,
          compare: [...state.compare, action.payload],
        };
      }
      

    case REMOVE_COMPARE:
      let updateCompare = state.compare.filter(
        (currItem) => currItem.product._id !== action.payload.id
      );
      return {
        ...state,
        compare: updateCompare,
      };
    default:
      break;
  }
};

export default compareReducer;
