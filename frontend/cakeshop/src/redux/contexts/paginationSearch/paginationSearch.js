import { createContext, useContext, useReducer } from "react";
import paginationSearchReducer from "../../reducers/paginationSearch/paginationSearch";
import { SET_PAGINATION_SEARCH } from "../../constrants/paginationSearch";


const PaginationSearchContext = createContext();

const initialState = {
    page: 1,
    limit: 5, 
}

const PaginationSearchProvider = ({children})=>{
    const [state, dispatch] = useReducer(paginationSearchReducer, initialState);

    const setPage = (page)=>{
        dispatch({
            type: SET_PAGINATION_SEARCH,
            payload: page
        })
    }
    return (
        <>
            <PaginationSearchContext.Provider value={{
                ...state, 
                setPage
            }}>
                {children}
            </PaginationSearchContext.Provider>
        </>
    )
}

const usePaginationSearchContext = ()=>{
    return useContext(PaginationSearchContext)
}

export {usePaginationSearchContext, PaginationSearchProvider}