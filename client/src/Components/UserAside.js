import React, { useState } from "react";
import DefaultProfileImg from "../Images/default-profile-image.jpg";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const UserAside = ({profileImageUrl, username, followers}) => {

    const [ showModal, setShowModal ] = useState(false);

    const handleClose = e => {
        setShowModal(false);
    }

    let following;
    if(followers && followers.length > 0){
        following = followers.map(u => {
            return (
                // <li key={u._id}><Link onClick={this.rerender} to={`/users/${u.username}`}>{u.username}</Link></li>
                <li key={u._id} style={{listStyle: "none"}}>
                    <img 
                        style={{borderRadius: "18px", marginRight: "5px"}} 
                        width="25"
                        height="25" 
                        src={u.profileImageUrl || DefaultProfileImg} 
                        alt="user"
                    />
                    <Link to={`/users/${u.username}`}>{u.username}</Link>
                </li>
            );
        }); 
    }else{
        following = <em>You are not following anyone!</em>
    }

    return (
        <aside className="col-3 d-none d-md-block" >
            <div className="card user-sidebar" >
                <img width="200" height="253" className="card-img-top" src={profileImageUrl || DefaultProfileImg} alt="Card backgound cap"/>
                <div className="card-body">
                    <h5 className="card-title">{username}</h5>
                    <div className="mb-2" style={{ display: "block"}}>
                        <strong style={{color: "#007bff", cursor: "pointer"}}> <a onClick={e => setShowModal(true)} >Following: </a></strong><span className="badge badge-secondary">{following.length || 0}</span>
                    </div>
                    <div>
                        <Link to={`/settings`}><i className="mr-1 fa fa-cog" aria-hidden="true"></i>Settings</Link>
                    </div>
                    <Link style={{paddingBottom: "10px"}} to={`/users/${username}`}><i className="mr-1 fa fa-user" aria-hidden="true"></i>View Profile</Link>
                    
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>You are following:</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p><strong>Following:</strong></p>
                    <ul>
                        {following}
                    </ul>
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={handleClose} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </Modal.Footer>

            </Modal>
          
        </aside>

    );
}



export default UserAside;