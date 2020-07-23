import React from "react";
import "../../css/Chat.css";

const ChatMessage = ({from, text, user}) => {
    return (
        <div className={`message-row ${from}`}>
            {(from === "received" && <div className="text-muted" style={{padding: "0px 10px"}}>{user}</div>)}
            <div className="message-content">
                <div className="message-text">{text}</div>
            </div>
        </div>
    );
}

export default ChatMessage;