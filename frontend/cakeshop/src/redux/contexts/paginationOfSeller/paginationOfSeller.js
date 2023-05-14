import { createContext, useContext, useReducer } from "react";
import paginationOfSellerReducer from "../../reducers/paginationOfSeller/PaginationOfSeller";
import { SET_PAGINATION } from "../../constrants/paginationOfSeller";


const PaginationOfSellerContext = createContext();

const initialState = {
    page: 1,
    limit: 5, 
}

const PaginationOfSellerProvider = ({children})=>{
    const [state, dispatch] = useReducer(paginationOfSellerReducer, initialState);

    const setPage = (page)=>{
        dispatch({
            type: SET_PAGINATION,
            payload: page
        })
    }
    return (
        <>
            <PaginationOfSellerContext.Provider value={{
                ...state, 
                setPage
            }}>
                {children}
            </PaginationOfSellerContext.Provider>
        </>
    )
}

const usePaginationOfSellerContext = ()=>{
    return useContext(PaginationOfSellerContext)
}

export {usePaginationOfSellerContext, PaginationOfSellerProvider}