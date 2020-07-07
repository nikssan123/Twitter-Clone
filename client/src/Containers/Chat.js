import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { addMessageNotification } from "../Store/Actions/user"

class Chat extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            message: "",
            messages : []
        }
        
        this.socket = this.props.socket;
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const { currentUser, match, socket } = this.props;
        const to = match.params.username;
        this.socket = socket;
        let info = {
            username: currentUser.user.username,
            to
            // id: currentUser.user.id
        }
        // this.socket.emit("register", info);
        console.log(`chat socket`);
        console.log( this.socket);
        this.socket.on("private-message", ({message, user}) => {
            console.log("private message from");
            this.setState({
                messages: [...this.state.messages, {message, user}]
            });
        });
    }

    // componentDidUpdate(){
    //     this.socket.on("private-message", ({message, user}) => {
    //         console.log("private message from");
    //         this.setState({
    //             messages: [...this.state.messages, {message, user}]
    //         });
    //     }); 
    // }


    handleClick(e){
        // this.setState({message: e.target.value});
        const message = e.target.value;
        const user = this.props.currentUser.user.username;
        const to = this.props.match.params.username;
        
        
        if(e.keyCode == 13 && message){
            // this.props.addMessageNotification(to, message, user);
            this.setState({
                messages: [...this.state.messages, {message, user}],
                message: ""
            });
            this.socket.emit("private-message", {
                to,
                message,
                user
            });
           
            
        }
        
    }
    
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render(){
        const messages = this.state.messages.map((m, i) => {
            return <li key={i}>From: {m.user}: {m.message}</li>
        });;



        return (
            <div>
                <ul>
                    {messages}
                </ul>
                <input value={this.state.message} name="message" onChange={this.handleChange} onKeyUp={this.handleClick} type="text" placeholder="Enter your message..."/>
            </div>
           
        );
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {addMessageNotification})(Chat);