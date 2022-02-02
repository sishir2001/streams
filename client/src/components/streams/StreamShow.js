import React,{Component} from "react";
import {connect} from "react-redux";

import {fetchStream} from "../../actions";
class StreamShow extends Component{

    componentDidMount(){
        // TODO : call fetchStream action creator
        // fetches the stream data based on id and updates the state
        this.props.fetchStream(this.props.match.params.id);
        // console.log(this.props.match.params.id);
    }

    render(){
        if(!this.props.stream){
            return (
                <div>Loading !!....</div>
            );
        }
        const {title,description} = this.props.stream;
        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state,componentProps)=>{
    // this object will inside the props object
    return {
        stream:state.streams[componentProps.match.params.id]
    };
};


export default connect(mapStateToProps,{fetchStream})(StreamShow);
