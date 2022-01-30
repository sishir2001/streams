import _ from 'lodash';
import React, { Component } from "react";
import { connect } from "react-redux";

import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";

// ! All variable url should be independent
class StreamEdit extends Component {
    componentDidMount() {
        // fetching a particular stream item
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // action creator -> REST-put method to edit a stream detail
        // ! should only have updates to the stream item -> PUT request
        // console.log(formValues);
        this.props.editStream(this.props.stream.id,formValues);
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading !!..</div>;
        }
        // const initialValues = {
        //     'title' : this.props.stream.title,
        //     'description' : this.props.stream.description
        // };
        return (
            // ? pass the initial values to StreamForm wrapped by reduxForm
            <div>
                <h3 className="header">Edit a form</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    initialValues={_.pick(this.props.stream,'title','description')}
                />
            </div>
        );
    }
}
const mapStateToProps = (state, componentProps) => {
    // we need to the object with id given in the url string
    return {
        stream: state.streams[componentProps.match.params.id],
    };
};
export default connect(mapStateToProps, { editStream, fetchStream })(
    StreamEdit
);
