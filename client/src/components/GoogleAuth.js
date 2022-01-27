import React, { Component } from "react";
import { connect } from "react-redux";
import { signedIn, signedOut } from "../actions";

// ! A centralised state for the auth is required ,so that application will know whether a user is authenticated when accessing components that need authentication
class GoogleAuth extends Component {
    componentDidMount() {
        // loading the js relaed to auth2 from gapi
        window.gapi.load("client:auth2", () => {
            // callback when the js for auth2 is loaded
            // the init function returns a promise
            // initiating the client to google with clientId and the required scope
            window.gapi.client
                .init({
                    clientId:
                        "46444242032-dq6fldmsk71rqfphp8f23doejgt1ms6o.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    // get instance of google authentication object
                    this.auth = window.gapi.auth2.getAuthInstance();
                    // ! this below line is important because
                    // TODO : update the state regarding whether a user is logged in or not
                    this.onAuthChange();

                    // ! setting up a listener
                    // there is a listen method to isSignedIn that calls a callback whenever isSignedIn is Changed
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    // ? called whenever isSignedIn is changed
    onAuthChange = () => {
        // change the state when the isSignedIn changes
        if (this.auth.isSignedIn.get() === true) {
            // true;
            this.props.signedIn(this.auth.currentUser.get().getId());
        } else {
            // false;
            this.props.signedOut();
        }
    };
    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return (
                <button className="ui secondary google loading button">
                    Loading
                </button>
            );
        } else if (this.props.isSignedIn === true) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui secondary google button"
                >
                    <i className="google icon" />
                    Sign out
                </button>
            );
        } else if (this.props.isSignedIn === false) {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui secondary google button"
                >
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

// ? converts State to props for the component
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    };
};

// @ params : signedIn , signedOut are action creaters
export default connect(mapStateToProps, { signedIn, signedOut })(GoogleAuth);
