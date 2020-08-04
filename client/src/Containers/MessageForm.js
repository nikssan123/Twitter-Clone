import React from "react";
import {connect} from "react-redux";
import { postNewMessage } from "../Store/Actions/messages";


class MessageForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: ""
        }

        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    handleNewMessage (e) {
        e.preventDefault();
        this.props.postNewMessage(this.state.message);
        // console.log("hi");
        this.setState({message: ""});
        // this.setState({});
        // console.log(this.state);
        this.props.history.push("/");
    }

    render(){
        return (
            <form onSubmit={this.handleNewMessage}>
                {this.props.errors.message && 
                    (<div className="alert alert-danger">{this.props.errors.message}</div>
                )}
                <textarea
                    style={{resize: "none"}}
                    rows={5}  
                    placeholder="Enter your message..."
                    type="text"
                    className="form-control"
                    value={this.state.message}
                    onChange={e => this.setState({message: e.target.value})} 
                />
                <button style={{marginTop: "20px"}} className="btn btn-success pull-right" type="submit">Add New Message</button>
            </form>
        );
    }
}

function mapStateToProps(state){
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, {postNewMessage})(MessageForm);