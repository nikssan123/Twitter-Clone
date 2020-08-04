import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../Images/warbler-logo.png";
import { logout } from "../Store/Actions/auth";
import { toggleSidemenu } from "../Store/Actions/toggle";

class Navbar extends React.Component{

    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    toggle = e => {
        e.preventDefault();
        this.props.toggleSidemenu(this.props.toggle ? false : true);
    }

    render(){
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        {this.props.currentUser.isAuthenticated && (
                             <div className={`toggle d-block d-md-none ${this.props.toggle ? "active" : null}`} onClick={this.toggle}> </div>
                        )}
                       
                        <Link to="/" className="navbar-brand" onClick={e => this.props.toggleSidemenu(false)}>
                            <img src={Logo} alt="Home"/>
                        </Link>
                    </div>
                   
                   {this.props.currentUser.isAuthenticated ? (
                       <ul className="nav navbar-nav navbar-right"> 
                            <li>
                                <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>New Message</Link>
                            </li>
                            <li>
                                <a onClick={this.logout}>Log out</a>
                            </li>
                       </ul>  
                   )
                   :  <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                        <li>
                            <Link to="/signin">Sign in</Link>
                        </li>
                    </ul>}
                
                    
                </div>
            </nav>
        )
    }
}


function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        toggle: state.toggleSidemenu.toggle
    }
}

export default connect(mapStateToProps, { logout, toggleSidemenu })(Navbar);