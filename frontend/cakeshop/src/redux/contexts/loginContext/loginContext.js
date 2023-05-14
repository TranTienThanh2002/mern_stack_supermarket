import { createContext, useContext, useReducer } from "react";
import userReducer from "../../reducers/loginReducer/loginReducer";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../../constrants/loginConstrant";

const UserContext = createContext();
const initialState = {
  user: [],
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const loginUser = (user) =>
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
  const logout = () =>
    dispatch({
      type: LOGOUT_SUCCESS,
    });

  return (
    <UserContext.Provider value={{ ...state, loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = ()=>{
    return useContext(UserContext);
}

export {UserProvider, useUserContext}