import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import Scroll from "react-scroll-to-bottom";
import { addMessageNotification, deleteNotification } from "../Store/Actions/user"
import { apiCall } from "../Services/api";
import ChatMessage from "../Components/Chat/ChatMessage";
import ChatHeader from "../Components/Chat/ChatHeader";
import ChatInput from "../Components/Chat/ChatInput";
import UserAside from "../Components/UserAside";
import "../css/Chat.css"; 

class Chat extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            message: "",
            messages : [],
            roomId: ""
            // received: []
        }
        
        this.socket = this.props.socket;
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            console.log(user);
            this.setState({
                messages: [...this.state.messages, {message, user, received: true}]
            });
        });

        const data = {
            username: currentUser.user.username,
            receiver: to
        }

        apiCall("post", "/api/chats", data).then(chatRoom => {
            const loadedMessages = chatRoom[0].messages.map(m => {
                console.log(m);
                return {
                    message: m.message,
                    user: m.from,
                    received: m.from === to ? true : false
                }
            }); 
            
            this.setState({
                ...this.state, 
                roomId: chatRoom[0]._id,
                messages: [...this.state.messages, ...loadedMessages]
            });
        });
        
    }

    handleClick(e){
        // this.setState({message: e.target.value});
        // const message = e.target.value;
        const {message} = this.state;
        const user = this.props.currentUser.user.username;
        const to = this.props.match.params.username;
        
        
        if(e.keyCode === 13 && message){
           this.submitFunction(message, user, to);
        }
    }

    handleSubmit(e){
        const {message} = this.state;
        const user = this.props.currentUser.user.username;
        const to = this.props.match.params.username;

        this.submitFunction(message, user, to);
    }

    submitFunction = (message, user, to) => {
        this.props.addMessageNotification(to, user);
        apiCall("put", `/api/chats/${this.state.roomId}`, {from: user, message: message}).then(chat => {
            // console.log(chat);
        });
        this.setState({
            messages: [...this.state.messages, {message, user}],
            message: ""
        });
        this.socket.emit("private-message", {
            to,
            message,
            user,
        });
    }
    
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render(){
        //check if the username in the url is same as the current user -> if it is the same redirect the user back with history.push("/") || history.back()
       
        const to = this.props.history.location.pathname.split("/")[2];
        if(to === this.props.currentUser.user.username){
            // this.props.history.goBack();
            this.props.history.push("/");
        }
        const messages = this.state.messages.map((m, i) => {
            console.log(m);
            return <ChatMessage key={i} from={m.received ? "received" : "outgoing"} text={m.message} user={m.user}/>
        });


        this.props.history.listen(() => {
            this.socket.disconnect();
            this.props.deleteNotification(this.props.currentUser.user.username);
        });

        return (
            // Add UserAside module in a new div
            //remove the styles from the div to a class named chatContainer -> set maxHeight so the overflow works -> see if you need to use ScrollToBottom unit
            //Add emojies -> style the chats -> add username and potentially the profile pic above the message -> add from using react-moment module
            <div className="d-flex" style={{height: "90vh"}}>
                {this.props.currentUser.isAuthenticated && (
                    <UserAside  profileImageUrl={this.props.currentUser.user.profileImageUrl} username={this.props.currentUser.user.username}/>
                )}
                <div className="col-12 col-md-8 offset-md-1 " >
                    <div className="chat-container">
                        <ChatHeader user={to}/>
                        <Scroll>
                            <div className="message-list">
                                {messages}
                            </div>
                        </Scroll>
                        
                        <ChatInput 
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyUp={this.handleClick}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                    
                    
                </div>
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