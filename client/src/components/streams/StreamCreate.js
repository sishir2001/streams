import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends Component {
    renderError = ({error,touched})=>{
        if(error && touched){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };
    renderInput = ({ input, label,meta })=>{
        const className = `field ${(meta.error && meta.touched)?'error':''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        );
    };
    onSubmit(formValues) {
        console.log(formValues);
    }
    render() {
        // TODO : need to create a form to take data of the stream
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="name"
                    component={this.renderInput}
                    label="Enter Name"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter Description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues)=>{
    // @param formValues : object with the details of a form
    const error = {};
    if(!formValues.name){
        // add an error message
        error.name = "Add a name"
    }
    if(!formValues.description){
        // add an error message
        error.description = "Add a description"
    }
    return error;
};
export default reduxForm({
    form: "streamCreate",
    validate
})(StreamCreate);
