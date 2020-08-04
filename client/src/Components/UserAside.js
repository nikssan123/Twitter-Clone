import React from "react";
import DefaultProfileImg from "../Images/default-profile-image.jpg";
import { Link } from "react-router-dom";

const UserAside = ({profileImageUrl, username, followers}) => {

    let following;
    if(followers && followers.length > 0){
        following = followers.map(u => {
            return (
                // <li key={u._id}><Link onClick={this.rerender} to={`/users/${u.username}`}>{u.username}</Link></li>
                <li key={u._id}>{u.username}</li>
            );
        }); 
    }else{
        following = <em>You are not following anyone!</em>
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
                <img width="200" height="253" className="card-img-top" src={profileImageUrl || DefaultProfileImg} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{username}</h5>
                    <div className="mb-2" style={{ display: "block"}}>
                        <strong style={{color: "#007bff"}}> <a data-toggle="modal" href="#followers">Following: </a></strong><span className="badge badge-secondary">{following.length || 0}</span>
                    </div>
                    <div>
                        <Link to={`/settings`}>Settings</Link>
                    </div>
                    <Link style={{paddingBottom: "10px"}} to={`/users/${username}`}>View Profile</Link>
                    
                </div>
            </div>


            <div className={`modal fade `} id="followers" tabIndex="-1" role="dialog" aria-labelledby="showFollowers" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">You are following:</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <p><strong>Following:</strong></p>
                            <ul>
                                {following}
                            </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </aside>

    );
}



export default UserAside;