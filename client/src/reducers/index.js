import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

// @ authInfo is an object 
export default combineReducers({
    auth : authReducer
});