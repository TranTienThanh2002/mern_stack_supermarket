import { createContext, useContext, useReducer } from "react";
import quickViewReducer from "../../reducers/quickViewReducer/quickViewReducer";
import { SHOW_QUICK_VIEW } from "../../constrants/quickViewConstrant";

const initialState = {
  id: "",
  quickView: false,
};

const QuickViewContext = createContext();

const QuickViewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quickViewReducer, initialState);

  const showQuickView = (id, status) => {
    dispatch({
      type: SHOW_QUICK_VIEW,
      payload: { id, status },
    });
  };
  return (
    <>
      <QuickViewContext.Provider
        value={{
          ...state,
          showQuickView,
        }}
      >
        {children}
      </QuickViewContext.Provider>
    </>
  );
};

const useQuickViewContext = ()=>{
    return useContext(QuickViewContext);
}

export {QuickViewProvider, useQuickViewContext}
