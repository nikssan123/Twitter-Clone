import React from "react";
import { connect } from "react-redux";
import {fetchMessages, removeMessage} from "../Store/Actions/messages";
import MessageItem from "../Components/MessageItem";
import SearchBar from "../Components/Search";
// import MessageForm from "../Containers/MessageForm";

class Messagelist extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pageNumber: 1,
            isLoading: false,
            hasMore: true
        }
    }

    componentDidMount(){
        this.props.fetchMessages();
    }

    loadData(data){
        if(!this.state.hasMore || this.state.isLoading) return;

        this.setState({
            isLoading: true
        });

        //make the apiCall -> in its .then method set the isLoading to false and hasMore to whaterver is the correct value -> increment the page number
    }

    render(){
        const { messages, removeMessage, currentUser, history, users } = this.props;
        let messageList = messages.map(m => {
            
            return (
                <MessageItem 
                    key={m._id} 
                    date={m.createAt} 
                    text={m.text} 
                    username={m.user.username} 
                    profileImageUrl={m.user.profileImageUrl} 
                    removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                    isCorrectUser={currentUser.id === m.user._id}
                />)
        });

        // return messageList;
        return (
            <div className="row col-md-8">
                <div className="offset-1 col-sm-10">
                    {/* <MessageForm {...this.props}/> */}
                    <SearchBar history={history} users={users}/>
                    <ul className="list-group" id="messages">
                        {messageList}
                    </ul>
                    {(this.state.isLoading && (
                        <div className="loader" style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        messages: state.messages,
        currentUser: state.currentUser.user,
        users: state.users.users
    };
}

export default connect(mapStateToProps, {fetchMessages, removeMessage})(Messagelist);