import React from "react";
import "../../css/Chat.css";

const ChatHeader = ({user}) => {
    return (
        <div className="chat-header">
            {/* <img src={this.props.currentUser.user.profileImageUrl} alt=""/> */}
            {/* <p>{this.props.currentUser.user.username}</p> */}
            <p>{user}</p>
        </div>
    );
}

export default ChatHeader;