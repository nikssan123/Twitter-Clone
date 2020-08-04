import React from "react";
import { sign } from "jsonwebtoken";
import { Link } from "react-router-dom";
// import io from "socket.io-client";

class AuthForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            username: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state).then(() => {            
           
            this.props.history.push("/");
        }).catch(()=> {
            return;
        });

        e.preventDefault();
    }

    render(){
        const { email, username, } = this.state;
        const { heading, buttonText, signUp, errors, history, removeError } = this.props;
        
        history.listen(() => {
            removeError();
        });

        return(
            <div>
                <div style={{paddingTop: "10vh"}} className="row justify-content-center align-content-center">
                    <div className="col-12 col-lg-8 text-center">
                        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                        <h2>{heading}</h2>
                        <div style={{ width: "40%", margin: "25px auto"}}>
                            <form onSubmit={this.handleSubmit}>
                                
                                
                                
                                {/* <label htmlFor="email">Email:</label> */}
                                <div className="form-group">
                                    <input 
                                        required
                                        autoFocus={true}
                                        type="email" 
                                        className="form-control" 
                                        id="email"
                                        name="email" 
                                        onChange={this.handleChange} 
                                        value={email}
                                        placeholder="Email"
                                    />
                                </div>
                               
                                {/* <label htmlFor="passowrd">Password: </label> */}
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        required
                                        className="form-control" 
                                        id="password" 
                                        name="password" 
                                        onChange={this.handleChange} 
                                        placeholder="Password"
                                    />
                                </div>
                                
                                {signUp && (
                                    <div className="form-group">
                                        {/* <label htmlFor="username">Username: </label> */}
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="username"
                                            name="username" 
                                            onChange={this.handleChange} 
                                            value={username}
                                            placeholder="Username"
                                        />
                                    </div>
                                )}
                                <div className="form-group">
                                    <button type="submit" className="btn mt-4 btn-primary btn-block">{buttonText}</button>
                                </div>
                                <hr/>
                                {signUp ? (
                                    <Link className="float-left" to="/signin">Already have an account?</Link>
                                    )
                                :(
                                    <div>
                                        <Link className="float-left" to="/forgot">Forgot your password?</Link>
                                        <Link className="float-left" to="/signup">Don't have an account?</Link>
                                    </div>
                                )}
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthForm;