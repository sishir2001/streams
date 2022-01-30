import _ from 'lodash';
import {
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
} from "../actions/type";

export const streamReducer = (state = {}, action) => {
    switch(action.type){
        default:
            return state;

        case FETCH_STREAM:
            return {...state,[action.payload.id]:action.payload}

        case CREATE_STREAM:
            return {...state,[action.payload.id]:action.payload}

        case EDIT_STREAM:
            // object key interpolation
            return {...state,[action.payload.id]:action.payload};

        case DELETE_STREAM:
            // delete the particular stream object
            return _.omit(state,action.payload); // ? returns a new object

        case FETCH_STREAMS:
            // action.payload is an array , but the state in this redux is an object 
            // ? lodash's mapKeys turns the array into object
            return {...state,..._.mapKeys(action.payload,'id')};
    };
};
