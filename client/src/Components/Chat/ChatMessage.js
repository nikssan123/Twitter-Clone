import React from "react";
import Moment from "react-moment";
import "../../css/Chat.css";

const ChatMessage = ({from, text, user, created}) => {
    const momentStyle = from === "outgoing" ? {display: "flex", justifyContent: "flex-end"} : {display: "flex", justifyContent: "flex-start"};
    return (
        <div className={`message-row ${from}`}>
            {(from === "received" && <div className="text-muted" style={{padding: "0px 10px", fontWeight: "bold"}}>{user}</div>)}
            <div className="message-content">
                <div className="message-text">{text}</div>
            </div>
            <div className="text-muted"  style={momentStyle}> <Moment fromNow>{created}</Moment></div>
        </div>
    );
}

export default ChatMessage;