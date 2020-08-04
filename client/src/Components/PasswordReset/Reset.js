import React from "react";
import { Link } from "react-router-dom";

class Reset extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            password: "",
            password2: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { password, password2 } = this.state;
        this.props.updatePassword({password, password2}, this.props.match.params.token);
    }

    render(){
        const { password, password2 } = this.state;
        const { alertMessage } = this.props;

        return (
            <div style={{paddingTop: "10vh"}} className="row justify-content-center align-content-center">
                <div className="col-12 col-lg-8 text-center">
                    {alertMessage && (
                        <div className={`alert alert-${alertMessage.type}`} role="alert">
                            {alertMessage.text}
                        </div>
                    )}
                    <h1 className="mb-3">Reset password</h1>
                    <div style={{ width: "40%", margin: "25px auto"}}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input 
                                    onChange={this.handleChange} 
                                    value={password} 
                                    className="form-control" 
                                    type="password" 
                                    name="password" 
                                    placeholder="New Password" 
                                    required 
                                    autofocus
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    onChange={this.handleChange} 
                                    value={password2} 
                                    className="form-control"
                                    type="password" 
                                    name="password2" 
                                    placeholder="Confirm Password" 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Update Password</button>
                            </div>
                        </form>

                        <hr/>
                        <Link className="float-left" to="/">Back Home</Link>

                       
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Reset;