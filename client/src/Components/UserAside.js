import React from "react";
import DefaultProfileImg from "../Images/default-profile-image.jpg";
import { Redirect, Link } from "react-router-dom";

const UserAside = ({profileImageUrl, username}) => {

    function redirect(){
        console.log("on");
        return (
            <Redirect to={`/users/${username}`}/>
        )
    }

    return (
        <aside className="col-3 d-none d-md-block">
            {/* <div className="card panel-default"> */}
                {/* <div className="card-body"> */}
                {/* <div className="user-sidebar">
                    <img height="200" width="200" className="img-thumbnail" src={profileImageUrl || DefaultProfileImg} alt={username}/>
                    <p></p>
                </div> */}
                    
                    {/* <p>{username}</p> */}
                {/* </div> */}
            {/* </div> */}
            <div className="card user-sidebar" >
                <img width="200" className="card-img-top" src={profileImageUrl || DefaultProfileImg} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{username}</h5>
                    <Link style={{paddingBottom: "10px"}} to={`/users/${username}`}>View Profile</Link>
                    
                </div>
            </div>
        </aside>

    );
}



export default UserAside;