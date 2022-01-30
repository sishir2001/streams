import React, { Component } from "react";
import Modal from "../../Modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deleteStream, fetchStream } from "../../actions";
import history from "../../history";

class StreamDelete extends Component {
    onDelete = () => {
        // console.log(props.match.params.id);
        // console.log("Delete Pressed");
        // TODO : call the deleteStream action creator
        this.props.deleteStream(this.props.match.params.id);
    };
    componentDidMount() {
        // TODO : fetch a stream item according to the id
        this.props.fetchStream(this.props.match.params.id);
    }

    renderAction() {
        // ! React Fragment -> void -> doesnt occupy a space
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={this.onDelete}>
                    Delete
                </button>
                <Link className="ui button" to="/">
                    Cancel
                </Link>
            </React.Fragment>
        );
    }
    render() {
        console.log(this.props.stream);
        if (!this.props.stream) {
            return <div>Loading ..</div>;
        }
        return (
            <Modal
                title="Delete Stream"
                content={`Are you sure to delete the stream : ${this.props.stream.title} ? `}
                actions={this.renderAction()}
                onDismiss={() => history.push("/")}
            />
        );
    }
}

const mapStateToProps = (state, componentProps) => {
    return {
        stream: state.streams[componentProps.match.params.id],
    };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
    StreamDelete
);
