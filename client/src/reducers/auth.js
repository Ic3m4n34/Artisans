import {
    REGISTER_SUCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialstate = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user:null
}

export default function(state = initialstate, action){
    const { type, payload } = action;
 switch(type) {
     case USER_LOADED:
     return{
         ...state,
         isAuthenticated: true,
         loading: false,
         user:payload
     }
     case REGISTER_SUCESS:
     case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
     return {
         ...state,
         ...payload,
         isAuthenticated: true,
         loading:false
     }
     case REGISTER_FAIL:
     case AUTH_ERROR:
     case LOGIN_FAIL:
     case LOGOUT:
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
    default:
        return state;    
 }
}