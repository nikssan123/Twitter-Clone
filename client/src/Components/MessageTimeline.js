import React from "react";
import MessageList from "../Containers/MessageList";
import UserAside from "../Components/UserAside";


const MessageTimeline = props => {
    return (
        <div className="row">
            <UserAside profileImageUrl={props.profileImageUrl} username={props.username}/>
            <MessageList socket={props.socket}/>
        </div>
    );
}

export default MessageTimeline;