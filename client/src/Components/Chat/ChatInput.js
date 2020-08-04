import React, { useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'
import "../../css/Chat.css";

const ChatInput = ({value, onChange, onKeyUp, onSubmit, onEmojiClick}) => {

    const [showEmoji, setShowEmoji] = useState(false);
    const [rightMargin, setRightMargin] = useState(undefined);
    const [bottomMargin, setBottomMargin] = useState(undefined);

    const showEmojiPicker = () => {
        showEmoji ? setShowEmoji(false) : setShowEmoji(true);
    }

    const resize = e => {
        
        const width = window.innerWidth;
        const height = window.innerHeight;
       
        if(width <= 991 && width > 500){
            setRightMargin("60px");
        }else if(width > 991){
            setRightMargin("90px");
        }else if(width <= 500){
            setRightMargin("40px");
        }

        if(height >= 600){
            setBottomMargin("50px");
        }else if(height <= 600 && height > 470){
            setBottomMargin("30px");
        }else if(height <= 470 && height > 370){
            setBottomMargin("15px");
        }else if(height <= 370){
            setBottomMargin("5px");
        }

    };

    // const closePicker = e => {
    //     console.log(e.target.className);
    // }

    useEffect(() => {

        resize();
        window.addEventListener("resize", resize);
        // window.addEventListener("click", closePicker);

        return () => {
            window.removeEventListener("resize", resize);
            // window.removeEventListener("click", closePicker);
        }
    }, []);

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
                    showPreview={false} 
                    title='Pick your emoji…' 
                    emoji='point_up' 
                    style={{position: "absolute", bottom: bottomMargin, right: rightMargin, float: "right"}}
                    onSelect={(e) => {
                        onEmojiClick(e);
                        // setShowEmoji(false);
                    }}
                />}
                
            </div>
            

        
    );
}

export default ChatInput;