import React from "react";
import DefaultProfileImg from "../Images/default-profile-image.jpg";

const UserAside = ({profileImageUrl, username}) => {
    return (
        <aside className="col-sm-2">
            {/* <div className="card panel-default"> */}
                {/* <div className="card-body"> */}
                    <img height="200" width="200" className="img-thumbnail" src={profileImageUrl || DefaultProfileImg} alt={username}/>
                {/* </div> */}
            {/* </div> */}
        </aside>

    );
}

export default UserAside;