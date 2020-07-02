import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../Images/default-profile-image.jpg";

const MessageItem = ({date, profileImageUrl, text, username, removeMessage, isCorrectUser}) => {
    const linkToUser = `/users/${username}`;
    return (
        <div>
            <li className="list-group-item">
               <div style={{display: "flex"}}>
                    <img src={profileImageUrl || DefaultProfileImg} alt={username} height="100" width="100" className="timeline-image"/>
                    <div className="message-area">
                        <Link to={linkToUser}>@{username} </Link>
                        <span className="text-muted">
                            <Moment className="text-muted" format="Do MMM YYYY">
                                {date}
                            </Moment>
                        </span>
                        <p>{text}</p>
                        
                    </div>
               </div>
                <div>
                    {isCorrectUser && (<a className="btn btn-danger float-right text-right" onClick={removeMessage}>X</a>)}
                </div>
                
            </li>
        </div>
    )
}

export default MessageItem;