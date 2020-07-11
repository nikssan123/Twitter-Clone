import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { addMessageNotification, deleteNotification } from "../Store/Actions/user"
import currentUser from "../Store/Reducers/currentUser";

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
        const { currentUser, match } = this.props;
        const to = match.params.username;
        this.socket = io.connect("http://localhost:8080");
        let info = {
            username: currentUser.user.username,
            to
            // id: currentUser.user.id
        }
        // this.props.addMessageNotification(to, info.username);
        this.socket.emit("register", info);
        this.socket.on("private-message", ({message, user}) => {
            this.setState({
                messages: [...this.state.messages, {message, user}]
            });
        });
    }

    handleClick(e){
        // this.setState({message: e.target.value});
        const message = e.target.value;
        const user = this.props.currentUser.user.username;
        const to = this.props.match.params.username;
        
        
        if(e.keyCode == 13 && message){
            this.props.addMessageNotification(to, user);
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
        //check if the username in the url is same as the current user -> if it is the same redirect the user back with history.push("/") || history.back()
        console.log();
        const to = this.props.history.location.pathname.split("/")[2];
        if(to === this.props.currentUser.user.username){
            // this.props.history.goBack();
            this.props.history.push("/");
        }
        const messages = this.state.messages.map((m, i) => {
            return <li key={i}>From: {m.user}: {m.message}</li>
        });;

        this.props.history.listen(() => {
            this.socket.disconnect();
            this.props.deleteNotification(this.props.currentUser.user.username);
        });

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

export default connect(mapStateToProps, {addMessageNotification, deleteNotification})(Chat);