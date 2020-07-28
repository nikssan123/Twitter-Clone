import React, {useState, useEffect} from "react";
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'
import "../../css/Chat.css";

const ChatInput = ({value, onChange, onKeyUp, onSubmit, onEmojiClick}) => {

    const [showEmoji, setShowEmoji] = useState(false);

    const showEmojiPicker = () => {
        showEmoji ? setShowEmoji(false) : setShowEmoji(true);
    }

    // const switchEmojiState = (e) => {
    //     if(showEmoji && e.target.className !== "fa fa-smile-o"){
    //         setShowEmoji(false);
    //     }
    // }

    // useEffect(() => {
    //     // document.addEventListener("mouseup", switchEmojiState);

    //     return () => {
    //         document.removeEventListener("mouseup", switchEmojiState);
    //     }
    // })
    



    return (
        // <div>
            <div className="chat-input">
                <div className="inputs">
                    <input 
                        value={value} 
                        name="message" 
                        onChange={onChange} 
                        onKeyUp={onKeyUp} 
                        type="text" 
                        placeholder="Enter your message..."
                        // style={{width: "100%", height: "100%"}}
                    />
                    <div className="emoji-picker" style={{textAlign: "center", flex: "3%"}} onClick={showEmojiPicker}>
                        <i style={{color: "#0084FF", cursor: "pointer", fontSize: "18px"}} className="fa fa-smile-o"></i>
                        
                    </div>
                    
                </div>
                <div className="submit">
                    <i style={{color: "#0084FF", cursor: "pointer"}} className="fa fa-paper-plane" onClick={onSubmit}></i>
                </div>
                {showEmoji && 
                <Picker 
                    color={"#0084FF"} 
                    showPreview={false} title='Pick your emoji…' 
                    emoji='point_up' 
                    style={{position: "absolute", bottom: '50px', right: '90px', float: "right"}}
                    onSelect={(e) => {
                        onEmojiClick(e);
                        // setShowEmoji(false);
                    }}
                />}
                
            </div>
            

        
    );
}

export default ChatInput;