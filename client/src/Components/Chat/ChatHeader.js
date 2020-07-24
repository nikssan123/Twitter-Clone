import React from "react";
import { Link } from "react-router-dom";
import "../../css/Chat.css";

const ChatHeader = ({user}) => {

    // handleClick = (e) => {

    // }

    return (
        <div className="chat-header">
            {/* <img src={this.props.currentUser.user.profileImageUrl} alt=""/> */}
            {/* <p>{this.props.currentUser.user.username}</p> */}
            <p>{user}</p>
            <Link style={{color: "white"}} to={`/users/${user}`}><i className="fa fa-info-circle"></i></Link>
        </div>
    );
}

export default ChatHeader;