import React, { Component } from "react";
import { createStreams } from "../../actions"; // for wiring action creators with connect function
import { connect } from "react-redux";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
    // ? callback when submit button is clicked
    onSubmit = (formValues) => {
        // action creator -> REST-post method to add new stream detail
        this.props.createStreams(formValues);
    };
    render() {
        return (
            <div>
                <h3 className="header">Create a stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

// const mapStateToProps = (state) => {};
export default connect(null, { createStreams })(StreamCreate);
