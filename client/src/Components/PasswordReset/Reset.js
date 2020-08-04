import React from "react";

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
            <div className="row justify-content-center align-content-center sign-form">
                <div className="col-6  text-center">
                    <h1 className="mb-3">Reset password</h1>
                    <div className="forms">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input onChange={this.handleChange} value={password} className="form-control" type="password" name="password" placeholder="New Password" required autofocus/>
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleChange} value={password2} className="form-control" type="password" name="password2" placeholder="Confirm Password" required/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Update Password</button>
                            </div>
                        </form>

                        {alertMessage && (
                            <div className={`alert alert-${alertMessage.type}`} role="alert">
                                {alertMessage.text}
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Reset;