import { SHOW_QUICK_VIEW } from "../../constrants/quickViewConstrant";

const quickViewReducer = (state, action) => {
  switch (action.type) {
    case SHOW_QUICK_VIEW:
      return {
        ...state,
        id: action.payload.id,
        quickView: action.payload.status,
      };
    default:
      break;
  }
};

export default quickViewReducer;
