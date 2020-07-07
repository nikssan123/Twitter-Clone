import React from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToBeRendered, socket){
    class Authenticate extends React.Component{
        componentDidMount(){
            if(this.props.isAuthenticated === false){
                this.props.history.push("/signin");
            }
        }

        componentDidUpdate(nextProps){
            if(nextProps.isAuthenticated === false){
                this.props.history.push("/signin");
            }
        }
        
        render(){
            return <ComponentToBeRendered {...this.props}  socket={socket} />;
        }

        
    }

    function mapStateToProps(state){
        return {
            isAuthenticated: state.currentUser.isAuthenticated
        }
    }
    
    return connect(mapStateToProps)(Authenticate);
}

