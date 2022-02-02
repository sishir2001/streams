import React,{Component} from "react";
import {connect} from "react-redux";
import flv from "flv.js";

import {fetchStream} from "../../actions";
class StreamShow extends Component{

    // creating a reference
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount(){
        // TODO : call fetchStream action creator
        const {id} = this.props.match.params;
        // fetches the stream data based on id and updates the state
        this.props.fetchStream(id);
        // console.log(this.props.match.params.id);
        this.buildPlayer();// this will only run once

    }

    // this lifecycle method will be called everytime after component rendering
    componentDidUpdate(){
        this.buildPlayer();
    }
    componentWillUnmount(){
        // clean up the player resources 
        // no longer attempting to download the video
        this.player.destroy();
    }

    buildPlayer(){
        if(this.player || !this.props.stream){
            return;
        }

        // only if the stream data is available or player is not built
        const {id} = this.props.match.params;
        // this lifecycle method will be called after the render method for once , so this is the place to setup the flv player
        // ? class variable
        this.player = flv.createPlayer({
            type:'flv',
            url:`http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
        // let the user play the video
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
                <video ref={this.videoRef} controls style={{width:'100%'}}></video>
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