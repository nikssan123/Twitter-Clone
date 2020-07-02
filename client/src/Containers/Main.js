import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../Components/Homepage";
import AuthForm from "../Components/AuthForm";
import { authUser } from "../Store/Actions/auth";
import { removeError } from "../Store/Actions/errors";
import withAuth  from "../Hocs/withAuth";
import MessageForm from "../Containers/MessageForm";
import UserShow from "../Components/UserShow";

const Main = props => {
    const { authUser, errors, removeError, currentUser } = props;
    return ( 
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
                    path="/users/:id/messages/new" 
                    component={withAuth(MessageForm)} 
                />
                <Route 
                    exact
                    path="/users/:username"
                    render={props => (<UserShow  currentUser={currentUser} {...props}/>)}
                    key={window.location.pathname}
                />
            </Switch>
        </div>
    );
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));
