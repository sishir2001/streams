import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchStreams } from "../../actions";
class StreamList extends Component {
    // first time rendering of the component
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = (stream) => {
        // console.log(`${this.props.currentUserId} ${stream.userId}`);
        if (this.props.currentUserId === stream.userId) {
            // ! how to send id of the stream post that user want to edit and delete
            return (
                <div className="right floated content">
                    <Link
                        to={`/streams/edit/${stream.id}`}
                        className="ui button green"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative"
                    >
                        Delete
                    </Link>
                </div>
            );
        }
    };

    renderList = () => {
        // ? mapping the list
        return this.props.streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link className="header" to={`/streams/${stream.id}`}>
                            <div className="header">{stream.title}</div>
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };
    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link className="ui button primary" to="/streams/new">
                        Create Form
                    </Link>
                </div>
            );
        }
    };
    render() {
        return (
            <div className="ui container">
                <h2 className="header">StreamList</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
