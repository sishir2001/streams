import streams from "../apis/streams";
import history from "../history";
import {
    SIGNED_OUT,
    SIGNED_IN,
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM,
} from "./type";

export const signedOut = () => {
    // @param isSignedIn tells whether authencation is done or not
    return {
        type: SIGNED_OUT,
    };
};
export const signedIn = (userId) => {
    // @param isSignedIn tells whether authencation is done or not
    return {
        type: SIGNED_IN,
        payload: userId,
    };
};

// action creator for posting a new created stream
export const createStreams = (formValues) => {
    // returning a function so that redux-thunk can handle it
    return async (dispatch,getState) => {
        // @param getState : function that returns the current state
        // creating a promise with axios
        const {userId} = getState().auth;// adding the userId of the user who created the stream
        const response = await streams.post("/streams", {...formValues,userId});
        // dispatch an object with an arrays of stream details to store it in redux
        dispatch({ type: CREATE_STREAM, payload: response.data });
        // TODO : programmatic navigation to root route after the server responds 
        history.push('/');
    };
};

// action creator for fetching a stream
export const fetchStream = (id) => {
    // returning a function so that redux-thunk can handle it
    return async (dispatch) => {
        // creating a promise with axios
        const response = await streams.get(`streams/${id}`);
        // dispatch an object with an arrays of stream details to store it in redux
        dispatch({ type: FETCH_STREAM, payload: response.data });
    };
};

// action creator for fetching all streams
export const fetchStreams = () => {
    // returning a function so that redux-thunk can handle it
    return async (dispatch) => {
        // creating a promise with axios
        const response = await streams.get("/streams");
        // dispatch an object with an arrays of stream details to store it in redux
        dispatch({ type: FETCH_STREAMS, payload: response.data });
    };
};

// action creator for editing a particular stream
export const editStream = (id,formValues) => {
    // returning a function so that redux-thunk can handle it
    return async (dispatch) => {
        // creating a promise with axios
        // ? sending edit request to server
        const response = await streams.patch(`streams/${id}`,formValues);
        // dispatch an object with an arrays of stream details to store it in redux
        // ? editing the local state with edited response
        dispatch({ type: EDIT_STREAM, payload: response.data });

        history.push('/');
    };
};

// action creator for deleting a particular stream
export const deleteStream = (id) => {
    // returning a function so that redux-thunk can handle it
    return async (dispatch) => {
        // creating a promise with axios
        // ? sending delete request to server
        await streams.delete(`streams/${id}`);
        // dispatch an object with an arrays of stream details to store it in redux
        // ! why payload as id of the stream ?
        // ? editing the local state 
        dispatch({ type: DELETE_STREAM, payload: id });
        history.push('/');
    };
};