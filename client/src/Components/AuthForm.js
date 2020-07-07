import React from "react";
// import io from "socket.io-client";

class AuthForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
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
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                            
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="email"
                                name="email" 
                                onChange={this.handleChange} 
                                value={email}
                            />
                            <label htmlFor="passowrd">Password: </label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                onChange={this.handleChange} 
                            />
                            {signUp && (
                                <div>
                                    <label htmlFor="username">Username: </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="username"
                                        name="username" 
                                        onChange={this.handleChange} 
                                        value={username}
                                    />
                                    <label htmlFor="image-url">Image URL: </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="image-url" 
                                        name="profileImageUrl" 
                                        onChange={this.handleChange} 
                                    />
                                </div>
                            )}

                            <button type="submit" className="btn mt-4 btn-primary btn-block btn-lg">{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthForm;