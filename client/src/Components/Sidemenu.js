import React from "react";
import { Link } from "react-router-dom";

class Sidemenu extends React.Component{
    
    handleClick = e => {
        e.preventDefault();
        this.props.toggleSidemenu(false);
    }

    render(){
        const { toggle, currentUser }  = this.props;
        return (
            <div>
                {toggle && (
                    <div className="sidemenu">
                        <ul>
                            <li onClick={this.handleClick}><i className="fa fa-home" aria-hidden="true"></i><Link to="/">Home</Link></li>
                            <li onClick={this.handleClick}><i className="fa fa-cog" aria-hidden="true"></i><Link to="/settings">Settings</Link></li>
                            <li onClick={this.handleClick}><i className="fa fa-user" aria-hidden="true"></i><Link to={`/users/${currentUser.user.username}`}>View Profile</Link></li>
                        </ul>
                    </div>
                )}
            </div>
            
            
        )
    }
}

export default Sidemenu;