import React from "react";
import { Link } from "react-router-dom";
// import { forgotPassword } from "../../Store/Actions/user";

class Forgot extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: this.props.currentUser.user.email || ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { forgotPassword } = this.props;

        forgotPassword(this.state.email);

    }

    render(){
        const { alertMessage } = this.props;
        return (
            <div style={{paddingTop: "10vh"}} className="row justify-content-center align-items-center">
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
                                    value={this.state.email} 
                                    className="form-control" 
                                    type="text" name="email" 
                                    placeholder="Email" 
                                    required 
                                    autofocus 
                                /> 
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Resset Password</button>
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

export default Forgot;