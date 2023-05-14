import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../../constrants/loginConstrant";


const userReducer = (state, action) =>{
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state, 
                user: [...state.user, action.payload]
            }
        case LOGOUT_SUCCESS:
            return {
                user: []
            };
        default:
            break;

    }
}

export default userReducer;