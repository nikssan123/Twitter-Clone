import React from "react";
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
        console.log(this.props.alertMessage);
        return (
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 text-center">
                    <h1 className="mb-3">Reset password</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {/* <label htmlFor="email">Email:</label> */}
                            <input onChange={this.handleChange} value={this.state.email} className="form-control" type="text" name="email" placeholder="Email" required autofocus /> 
                           
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Resset Password</button>
                        </div>
                        {alertMessage && (
                            <div className={`alert alert-${alertMessage.type}`} role="alert">
                                {alertMessage.text}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        )
    }
}

export default Forgot;