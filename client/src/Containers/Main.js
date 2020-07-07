import React, {useEffect} from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../Components/Homepage";
import AuthForm from "../Components/AuthForm";
import { authUser } from "../Store/Actions/auth";
import { removeError } from "../Store/Actions/errors";
import withAuth  from "../Hocs/withAuth";
import MessageForm from "../Containers/MessageForm";
import UserShow from "../Components/UserShow";
import Chat from "../Containers/Chat";
import io from "socket.io-client";

let socket;

const Main = props => {

    // socket = io.connect("http://localhost:8080");
    socket = io("http://localhost:8080", {reconnection: false});

    const { authUser, errors, removeError, currentUser } = props;
    
    console.log(`main socket:`);
    console.log(socket);

    return ( 
        <div className="container">
            {/* {user.chatMessages.from && (<div>{user.chatMessages.from}</div>)} */}
            <Switch>
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} socket={socket}  {...props} />} />
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
                    component={withAuth(Chat, socket)}
                />
            </Switch>
        </div>
    );
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors,
        // user: state.user
    }
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));
