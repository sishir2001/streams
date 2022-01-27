import { SIGNED_OUT,SIGNED_IN } from "../actions/type";
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

// ? this reducer updates the isSignedIn state in the redux
export const authReducer = (state = INITIAL_STATE, action) => {
    // ! update the redux state
    switch (action.type) {
        case SIGNED_IN:
            return { ...state, isSignedIn: true,userId:action.payload };
        case SIGNED_OUT:
            return { ...state, isSignedIn: false ,userId:null};
        default:
            return state;
    }
};
