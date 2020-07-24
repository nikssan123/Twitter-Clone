import React from "react";
import { connect } from "react-redux";
import {fetchMessages, removeMessage} from "../Store/Actions/messages";
import MessageItem from "../Components/MessageItem";
import MessageForm from "../Containers/MessageForm";

class Messagelist extends React.Component{

    componentDidMount(){
        this.props.fetchMessages();
    }

    render(){
        const { messages, removeMessage, currentUser } = this.props;
        let messageList = messages.map(m => {
            
            return (
                <MessageItem 
                    key={m._id} 
                    date={m.createAt} 
                    text={m.text} 
                    username={m.user.username} 
                    profileImageUrl={m.user.profileImageUrl} 
                    removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                    isCorrectUser={currentUser.id === m.user._id}
                />)
        });

        // return messageList;
        return (
            <div className="row col-md-8">
                <div className="offset-1 col-sm-10">
                    {/* <MessageForm {...this.props}/> */}
                    <ul className="list-group" id="messages">
                        {messageList}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        messages: state.messages,
        currentUser: state.currentUser.user
    };
}

export default connect(mapStateToProps, {fetchMessages, removeMessage})(Messagelist);