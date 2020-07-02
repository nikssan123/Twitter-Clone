import React from "react";
import { connect } from "react-redux";
import { fetchUserInfo, followUser, unfollowUser, deleteMessage } from "../Store/Actions/user";
import { Link } from "react-router-dom";
import MessageItem from "../Components/MessageItem";
import DefaultProfileImage from "../Images/default-profile-image.jpg";


class UserMessage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            infoMessage: "",
            error: "",
            isFollowing: false,
            followers: 0,
            followersList: []
        }

        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
    }
    
    componentDidMount(){
        const username = this.props.match.params.username;
        
        this.props.fetchUserInfo(username).then(() => {
            const { user, currentUser } = this.props;
            user.followers.forEach(user => {
                
                if(user._id === currentUser.user.id){
                    this.setState({
                        ...this.state,
                        isFollowing: true
                    });
                }
            });
            
            this.setState({...this.state, followers: user.followers.length, followersList: user.followers});
        });

        
    }

    setInfoState = (state) => {
        this.setState(state, () => {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    infoMessage: "",
                    error: ""
                })
            }, 5000)
        });
    }

    handleFollow(user, currentUser){
        this.props.followUser(user.username, currentUser.user.id)
        .then(res => {
            let newFollowersNum = this.state.followers + 1;
            this.setInfoState({isFollowing: true, infoMessage: `You succesfully followed ${res[0].username}`, followers: newFollowersNum,});
        }).catch(err => {
           
            this.setState({...this.state, error: "Something went wrong! Try again later!"});
        });
    }

    handleUnfollow(user, currentUser){
        this.props.unfollowUser(user.username, currentUser.user.id)
        .then(res => {
            let newFollowersNum = this.state.followers - 1;
            this.setInfoState({isFollowing: false,  infoMessage: `You succesfully unfollowed ${res[0].username}`, followers: newFollowersNum});
        }).catch(err => {
           
            this.setInfoState({...this.state, error: "Something went wrong! Try again later!"});
        });
    }

    handleDeleteMessage(userId, messageId){
        this.props.deleteMessage(userId, messageId).then(() => {
            this.setInfoState({...this.state, infoMessage: "You successfully deleted the message!"});
        });
    }

    render(){
        const { currentUser, user, messages, history } = this.props;
        

        let isSameUser = currentUser.user.id === user._id;
        const messagesList = messages.reverse().map(m => {
            return (
                <MessageItem 
                    key={m._id} 
                    date={m.createdAt} 
                    text={m.text} 
                    username={user.username} 
                    profileImageUrl={user.profileImageUrl}
                    removeMessage={() => this.handleDeleteMessage(m.user, m._id)}
                    isCorrectUser={currentUser.user.id === m.user}
                />)
        });
        
        let followers;
        if(this.state.followersList.length > 0){
            followers = this.state.followersList.map(u => {
                return (
                    // <li key={u._id}><Link to={`/users/${u.username}`}>{u.username}</Link></li>
                    <li key={u._id}>{u.username}</li>
                );
            }); 
        }else{
            followers = <em>No followers yet</em>
        }
        

        const col1 = currentUser.isAuthenticated ? "row col-md-8" : "row col-sm-12";
        return(
            <div className={col1}>
                <div className="col-sm-12">
                  
                    {this.state.infoMessage && (<div className={this.state.error ? "alert alert-danger" : "alert alert-success"}>{this.state.infoMessage}</div>)}
                    
                    <div className="show-user">
                        <div className="cover" >
                            <img className="user-avatar" height="200" src={user.profileImageUrl || DefaultProfileImage} alt={user.username}/>
                        </div>
                        
                        <p>@{user.username}</p>
                        <span className="email">{user.email}</span>
                        <strong style={{color: "#007bff"}}> <a data-toggle="modal" href="#followers">Followers: </a></strong><span class="badge badge-secondary">{this.state.followers}</span>
                        {currentUser &&  !isSameUser && ( !this.state.isFollowing ?
                            <button onClick={() => {this.handleFollow(user, currentUser)}} className="btn btn-primary ">Follow</button>
                            : <button onClick={() => {this.handleUnfollow(user, currentUser)}} className="btn btn-primary ">Unfollow</button>
                        )}
                        {/* <button onClick={() => {this.handleClick(user, currentUser)}} className="btn btn-primary ">Follow</button> */}
                    </div>
                    <ul className="list-group" id="messages">
                    {messagesList}
                    </ul>
                </div>

                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button> */}

               
                <div className={`modal fade `} id="followers" tabindex="-1" role="dialog" aria-labelledby="showFollowers" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Followers of {user.username}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <p><strong>Followed by:</strong></p>
                            <ul>
                                {followers}
                            </ul>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        currentUser: state.currentUser,
        user: state.user.user,
        messages: state.user.messages
    }
}

export default connect(mapStateToProps, {fetchUserInfo, followUser, unfollowUser, deleteMessage})(UserMessage);

