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
            roomId: "",
            pageNumber: 1,
            isLoading: false,
            hasMore: true
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
            this.setState({
                messages: [...this.state.messages, {message, user, received: true}]
            });
        });

        const data = {
            username: currentUser.user.username,
            receiver: to,
            pageNumber: this.state.pageNumber
        }

        
        this.loadChat(data);
    }

    loadChat(data){

        if(this.state.isLoading || !this.state.hasMore) return;

        this.setState({
            isLoading: true
        });

        apiCall("post", "/api/chats", data).then(chatRoom => {
            let loadedMessages = [];
            if(chatRoom[0] !== undefined){
                loadedMessages = chatRoom[0].messages.map(m => {
                    
                    return {
                        message: m.message,
                        user: m.from,
                        received: m.from === data.receiver ? true : false,
                        created: m.date
                    }
                }); 

                const hasMore = loadedMessages[0].message === undefined ? false : true;
                this.setState({
                    ...this.state, 
                    roomId: chatRoom[0]._id,
                    messages: [ ...loadedMessages, ...this.state.messages],
                    pageNumber: this.state.pageNumber + 1,
                    isLoading: false,
                    hasMore
                });
            }else{
                this.setState({
                    ...this.state,
                    roomId: chatRoom._id,
                    isLoading: false
                })
            }
            

           
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
        message = message.trim();
        if(message !== ""){
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
        
    }
    
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    

    handleScroll = (e) => {

        const { currentUser, match } = this.props;
        const to = match.params.username;

        // check if the scroll event is fired in the emoji picker -> if so dont load new data
        const className = e.target.className;
        const top = e.target.scrollTop === 0;
        if (top && className !== "emoji-mart-scroll") { 
            const data = {
                username: currentUser.user.username,
                receiver: to,
                pageNumber: this.state.pageNumber,
                
            }

            this.loadChat(data);
        }
    }

    handleEmojiClick = e => {
        this.setState({
            ...this.state,
            message: this.state.message + e.native
        })
    }
    
    render(){
        //check if the username in the url is same as the current user -> if it is the same redirect the user back with history.push("/") || history.back()
       
        const to = this.props.history.location.pathname.split("/")[2];
        if(to === this.props.currentUser.user.username){
            // this.props.history.goBack();
            this.props.history.push("/");
        }
        const messages = this.state.messages.map((m, i) => {
            if(m.message !== undefined){
                return <ChatMessage 
                    key={i} 
                    from={m.received ? "received" : "outgoing"} 
                    text={m.message} user={m.user} created={m.created}
                />
            }
           
        });


        this.props.history.listen(() => {
            this.socket.disconnect();
            this.props.deleteNotification(this.props.currentUser.user.username);
        });

        return (
            //Add emojies -> style the chats -> add username and potentially the profile pic above the message -> add from using react-moment module
            <div className="d-flex" style={{height: "90vh"}}>
                {this.props.currentUser.isAuthenticated && (
                    <UserAside  
                        profileImageUrl={this.props.currentUser.user.profileImageUrl} 
                        username={this.props.currentUser.user.username}
                        followers={this.props.currentUser.following}
                    />
                )}
                <div className="col-12 col-md-8 offset-md-1 " >
                    <div className="chat-container" onScroll={this.handleScroll}>
                        <ChatHeader user={to}/>
                        <Scroll > 
                            <div className="message-list" >
                                {(!this.state.hasMore && (
                                    <div style={{display: "flex", justifyContent: "center", margin: "10px 0"}}>
                                        <em>No more messages!</em>
                                    </div>
                                ))}
                                {(this.state.isLoading && (
                                    <div className="loader" style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                        <div className="bounce1"></div>
                                        <div className="bounce2"></div>
                                        <div className="bounce3"></div>
                                    </div>
                                ))}
                                {messages}
                            </div>
                        </Scroll>
                        
                        <ChatInput 
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyUp={this.handleClick}
                            onSubmit={this.handleSubmit}
                            onEmojiClick={this.handleEmojiClick}
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