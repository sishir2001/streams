import { SIGNED_OUT,SIGNED_IN } from "./type";
export const signedOut = ()=>{
    // @param isSignedIn tells whether authencation is done or not 
    return {
        type : SIGNED_OUT
    };
};
export const signedIn = (userId)=>{
    // @param isSignedIn tells whether authencation is done or not 
    return {
        type : SIGNED_IN,
        payload : userId
    };
};