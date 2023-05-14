import { LOADING_FALSE, LOADING_TRUE } from "../../constrants/loadingPage";


const loadingReducer = (state, action) => {
  switch (action.type) {
    case LOADING_TRUE:
      return {
        ...state,
        loadingPage: action.payload,
      };
    case LOADING_FALSE:
      return {
        ...state,
        loadingPage: action.payload,
      };
    default:
      break;
  }
};

export default loadingReducer;
