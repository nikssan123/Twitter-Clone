import React from "react";
import "../../css/Chat.css";

const ChatInput = ({value, onChange, onKeyUp, onSubmit}) => {
    return (
        <div className="chat-input">
            <input 
                value={value} 
                name="message" 
                onChange={onChange} 
                onKeyUp={onKeyUp} 
                type="text" 
                placeholder="Enter your message..."
                // style={{width: "100%", height: "100%"}}
            />
            <i style={{color: "#0084FF"}} class="fa fa-paper-plane" onClick={onSubmit}></i>
        </div>
    );
}

export default ChatInput;