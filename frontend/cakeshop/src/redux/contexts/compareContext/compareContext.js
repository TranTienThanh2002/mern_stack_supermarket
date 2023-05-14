import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import compareReducer from "../../reducers/compareReducer/compareReducer";
import {
  ADD_TO_COMPARE,
  REMOVE_COMPARE,
} from "../../constrants/compareConstrant";

const CompareContext = createContext();
const getLocalCompareData = () => {
  let localCompareData = localStorage.getItem("CompareItems");
  if (localCompareData === [] || localCompareData == null) {
    return [];
  } else return JSON.parse(localCompareData);
};
const initialState = {
  compare: getLocalCompareData(),
};

const CompareProvider = ({ children }) => {
  const [state, dispatch] = useReducer(compareReducer, initialState);

  const addToCompare = (product) => {
    dispatch({
      type: ADD_TO_COMPARE,
      payload: { product },
    });
  };

  const removeFromCompare = (id) => {
    dispatch({
      type: REMOVE_COMPARE,
      payload: { id },
    });
  };
  useEffect(()=>{
    localStorage.setItem("CompareItems", JSON.stringify(state.compare));
  },[state.compare]);
  return (
    <>
      <CompareContext.Provider
        value={{
          ...state,
          addToCompare,
          removeFromCompare,
        }}
      >
        {children}
      </CompareContext.Provider>
    </>
  );
};
const useCompareContext = () => {
  return useContext(CompareContext);
};

export { CompareProvider, useCompareContext };
