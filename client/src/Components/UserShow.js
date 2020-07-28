import React from "react";
import UserAside from "../Components/UserAside";
import UserMessages from "../Containers/UserMessages";

function UserShow(props){
    
    return(
        <div className="row">
            {props.currentUser.isAuthenticated && (
                <UserAside  profileImageUrl={props.currentUser.user.profileImageUrl} username={props.currentUser.user.username} followers={props.currentUser.following}/>
            )}
            
            <UserMessages {...props} />
        </div>
    );
    
}

export default UserShow;