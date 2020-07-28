import React from "react";
import MessageList from "../Containers/MessageList";
import UserAside from "../Components/UserAside";


const MessageTimeline = ({profileImageUrl, username, followers, history}) => {
    return (
        <div className="row">
            <UserAside profileImageUrl={profileImageUrl} username={username} followers={followers}/>
            <MessageList history={history}/>
        </div>
    );
}

export default MessageTimeline;