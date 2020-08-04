import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editUser, deleteUser, logout } from "../Store/Actions/auth";
import { removeError } from "../Store/Actions/errors";
import DefaultProfilePic from "../Images/default-profile-image.jpg";
import { Modal } from "react-bootstrap";

class Settings extends React.Component{


    // _isMounted = false;

    constructor(props){
        super(props);

        const user = this.props.currentUser.user;

        // console.log(user.profileImageUrl);
        this.state = {
            username: user.username,
            email: user.email,
            profilePic: user.profileImageUrl || DefaultProfilePic,
            file: null,
            showModal: false
            // message: ""
        }

    }

    handleClose = e => {
        this.setState({
            showModal: false
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFileInput = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                profilePic: reader.result,
                file: reader.result
            });
        }

        reader.onerror = () => {
            console.log("error");
        }

    }

    handleDelete = e => {
        e.preventDefault();
        this.props.deleteUser(this.props.currentUser.user.id).then(() => {
            this.props.logout();
            this.setState({showModal: false});
            this.props.history.push("/");
        }).catch(err => {
            // debugger;
        });


    }

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.state.username,
            email: this.state.email,
            file: this.state.file
        }


        this.props.editUser(data, this.props.currentUser.user.id).then(data => {
            
        });        
    }

    render(){

        this.props.history.listen(() => {
            this.props.removeError();
        });

        return (
            <div>
                {this.props.error.message && 
                        <div className="alert alert-success" role="alert">
                            {this.props.error.message}
                        </div>
                }
                <div className="row d-flex justify-content-center">
                    
                    <div className="col-10">
                        <h3 className="pt-3">Account Settings</h3>
                        <div className="card">
                            <div className="px-2 px-md-5 pt-5 card-body">
                                <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group">
                                                <label htmlFor="username" className="labels"><i className="fa fa-user"></i> Username: </label>
                                                <input onChange={this.handleChange} className="form-control" id="username" type="text" name="username" value={this.state.username}></input>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email" className="labels"><i className="fa fa-envelope"></i> Email: </label>
                                                <input onChange={this.handleChange} className="form-control" id="email" type="email" name="email" value={this.state.email} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password" className="labels"><i className="fa fa-lock"></i> Password: </label>
                                                <input  className="form-control" id="password" type="password" defaultValue="***********" disabled/>
                                                <small id="password" className="form-text text-muted"><Link to="/forgot">Click here to reset your password</Link></small>
                                            </div>

                                            <input type="submit" className="mt-3 btn btn-primary" defaultValue="Save changes"/>
            
                                            <div className="mt-3 float-md-right">
                                                <button onClick={e => this.setState({showModal: true})} type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteForm">Delete account</button>
                                            </div>
                                        </div>
                                        <div className="col-4 text-center" id="profile-image">
                                            <img height="250" width="250" className="img-fluid" id="accImage" src={this.state.profilePic}/>
                                            <label id="profilePicLabel" className="btn btn-primary mt-4 btn-sm btn-md-lg" htmlFor="profilePic">Upload Picture</label>
                                            <input onChange={this.handleFileInput} style={{display: "none"}} type="file" name="profilePic" id="profilePic"/>
                                            {/* add onChange method -> save profile image -> preview it in the browser */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Account</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete your account?</p>
                        <em>You will lose all associated data to your account!</em>
                    </Modal.Body>

                    <Modal.Footer>
                        <button onClick={this.handleClose} type="button" className="btn btn-secondary">No</button>
                        <button onClick={this.handleDelete} className="btn btn-danger">Yes</button>
                    </Modal.Footer>

                </Modal>


                
               
            </div>
            
        )
    }
}


function mapStateToProps(state){
    // console.log(state);
    return {
        currentUser: state.currentUser,
        error: state.errors
    }
}

export default connect(mapStateToProps, {editUser, removeError, deleteUser, logout})(Settings);