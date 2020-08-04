import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "../Components/MessageTimeline";



const Homepage = ({currentUser, history}) => {

    if(!currentUser.isAuthenticated){
        return (
            <div className="home-hero">
                <h1>What's Happening?</h1>
                <h4>New To Warbler?</h4>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
       );
    }else{

        return (
            
            <div>
                <MessageTimeline 
                    history={history}
                    profileImageUrl={currentUser.user.profileImageUrl} 
                    username={currentUser.user.username} 
                    followers={currentUser.following}
                />
            </div>
        )
    }

    
   
}

export default (Homepage);