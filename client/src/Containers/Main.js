import React from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../Components/Homepage";
import AuthForm from "../Components/AuthForm";
import { authUser, updatePassword } from "../Store/Actions/auth";
import { checkUserNotification, deleteNotification, fetchFollowers, getAllUsers, forgotPassword } from "../Store/Actions/user"
import { toggleSidemenu } from "../Store/Actions/toggle";
import { removeError } from "../Store/Actions/errors";
import withAuth  from "../Hocs/withAuth";
import MessageForm from "../Containers/MessageForm";
import UserShow from "../Components/UserShow";
import Chat from "../Containers/Chat";
import Settings from "../Containers/Settings";
import Forgot from "../Components/PasswordReset/Forgot";
import Reset from "../Components/PasswordReset/Reset";
import Sidemenu from "../Components/Sidemenu";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import "animate.css"


class Main extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            id: 0
        }
    }

    componentDidMount(){
        const { deleteNotification, currentUser, checkUserNotification, fetchFollowers, getAllUsers } = this.props;
        
        getAllUsers();

        const username = currentUser.user.username;
        if(currentUser.user.id){
            fetchFollowers(currentUser.user.id);



            setInterval(() => {
                //get the path -> run the checkNotification function every time he is not chatting with somebody
                const path = window.location.pathname.split("/")[1];
                if(path !== "chat"){
                    checkUserNotification(username).then(() => {
                        const notification = this.props.notifications;
                        const from = notification.from;
                        const id = this.state.id;
                        // if(notification && from && (id >= 0 && id <= 1)){
                        if(notification && from && (id === 0)){
                            let idStore = store.addNotification({
                                title: `${from} want to connect!`,
                                message: <Link onClick={() => deleteNotification(username)} style={{color: "white"}} to={`/chat/${from}`}>Click here to chat!</Link>,
                                type: "info",
                                insert: "top",
                                container: "top-right",
                                animationIn: ["animated", "fadeIn"],
                                animationOut: ["animated", "fadeOut"],
                                dismiss: {
                                    duration: 0,
                                    //   onScreen: true,
                                    showIcon: true,
                                    //   pauseOnHover: true
                                },
                                onRemoval: () => {
                                    deleteNotification(username);
                                    this.setState({id: 0});
                                }
                            });
                            this.setState({id: idStore});
                        }
                    });
                }
            }, 4000);
    
        }
        
        
        
    }

    render(){
        const { authUser, errors, removeError, currentUser, forgotPassword, updatePassword, toggle, toggleSidemenu } = this.props;

        return ( 
            <div> 
                {currentUser.isAuthenticated && (
                    <Sidemenu  toggleSidemenu={toggleSidemenu} toggle={toggle} currentUser={currentUser}/>
                )} 
                
                <div className="container">
                   
                    <Switch>
                        <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />
                        <Route 
                            exact 
                            path="/signin" 
                            render={props => {
                                return(
                                    <AuthForm 
                                        removeError={removeError}
                                        errors={errors}
                                        onAuth={authUser}
                                        buttonText="Log in" 
                                        heading ="Welcome Back" 
                                        {...props}
                                        
                                    />
                                ) 
                        }}/>
                        <Route 
                            exact 
                            path="/signup" 
                            render={props => {
                                return(
                                    <AuthForm 
                                        removeError={removeError}
                                        errors={errors}
                                        onAuth={authUser}
                                        signUp
                                        buttonText="Sign up" 
                                        heading ="Join Now" 
                                        {...props}
                                    />
                                )
                        }}/>
                        <Route 
                            exact
                            path="/forgot"
                            render={props => {
                                return (
                                    <Forgot 
                                        currentUser={currentUser} 
                                        forgotPassword={forgotPassword} 
                                        alertMessage={errors.message}
                                        {...props}
                                    />
                                )
                            }}
                        />
                        <Route 
                            exact
                            path="/reset/:token"
                            render={props => {
                                return (
                                    <Reset 
                                        updatePassword={updatePassword}
                                        alertMessage={errors.message}
                                        {...props}
                                    />
                                )
                            }}
                        />
                        <Route 
                            exact
                            path="/users/:id/messages/new" 
                            component={withAuth(MessageForm)} 
                        />
                        <Route 
                            exact
                            path="/users/:username"
                            render={props => (<UserShow  currentUser={currentUser} {...props}/>)}
                            key={window.location.pathname}
                        />
                        <Route
                            exact
                            path="/chat/:username"
                            // render={props => (<Chat {...props} />)}
                            component={withAuth(Chat)}
                        />
                        <Route 
                            exact
                            path="/settings"
                            component={withAuth(Settings)}
                        />
                    </Switch>
        
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors,
        notifications: state.notifications,
        toggle: state.toggleSidemenu.toggle
    }
}

export default withRouter(connect(mapStateToProps, {
    authUser, 
    updatePassword,
    removeError, 
    checkUserNotification, 
    deleteNotification, 
    fetchFollowers, 
    getAllUsers,
    forgotPassword,
    toggleSidemenu,
})(Main));


