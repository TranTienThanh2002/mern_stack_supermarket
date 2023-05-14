import { createContext, useContext, useReducer } from "react";
import { LOADING_FALSE, LOADING_TRUE } from "../../constrants/loadingPage";
import loadingReducer from "../../reducers/loadingPageReducer/loadingPageReducer";


const initialState = {
  loadingPage: false,
};

const LoadingPageContext = createContext();

const LoadingPageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  const loadingPageTrue = () => {
    dispatch({
      type: LOADING_TRUE,
      payload: true,
    });
  };
  const loadingPageFalse = () => {
    dispatch({
      type: LOADING_FALSE,
      payload: false,
    });
  };
  return (
    <>
      <LoadingPageContext.Provider
        value={{
          ...state,
          loadingPageTrue,
          loadingPageFalse
        }}
      >
        {children}
      </LoadingPageContext.Provider>
    </>
  );
};

const useLoadingPageContext = ()=>{
    return useContext(LoadingPageContext);
}

export {LoadingPageProvider, useLoadingPageContext}
