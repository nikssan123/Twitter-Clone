import { apiCall } from "../../Services/api";
import { SHOW_USER_INFO, DELETE_USER_MESSAGE, NEW_CHAT_MESSAGE, GET_NOTIFICATION } from "../actionTypes";
import { addError } from "./errors";

export const loadUserInfo = (user, messages) => {
    return {
        type: SHOW_USER_INFO,
        user,
        messages
    }
}

export const remove = id => {
    return {
        type: DELETE_USER_MESSAGE,
        id
    }
}

export const newChatMessage = (from) => {
    return {
        type: NEW_CHAT_MESSAGE,
        from
    }
}

export const notification = (from) => {
    return{
        type: GET_NOTIFICATION,
        from
    }
}

export const fetchUserInfo = username => {
    return dispatch => {
        return apiCall("get", `/api/users/${username}`).then(res => {
            dispatch(loadUserInfo(res[0], res[0].messages));
        }).catch(err => {
            dispatch(addError(err));
        });
    }
}

export const followUser = (username, id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("put", `/api/users/${username}/follow/${id}`).then(user => {
                // dispatch(addError("Succesfully followed "));
                // console.log(user);
                // dispatch(loadUserInfo(user[0], user[0].messages));
                return resolve(user);
            }).catch(err => {
                dispatch(addError(err));
                return reject();
            });
        })
        
    }
}

export const unfollowUser = (username, id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("put", `/api/users/${username}/unfollow/${id}`).then(user => {
                return resolve(user);
            }).catch(err => {
                dispatch(addError(err));
                return reject();
            });
        })
    }
}

export const deleteMessage = (userId, messageId) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${userId}/messages/${messageId}`)
            .then(() => {
                dispatch(remove(messageId));
            })
            .catch(err => dispatch(addError(err.message))); 
    }
}

export const addMessageNotification = (to, from) => {
    return dispatch => {
        return apiCall("put", `/api/users/${to}/${from}`).then(user => {
            
            // dispatch(newChatMessage(user.chatMessages.from));
            return user;
        }).catch(err => dispatch(addError(err)));
    }
}

export const checkUserNotification = username => {
    return dispatch => {
        // return new Promise((resolve, reject) => {
            return apiCall("get", `/api/users/${username}`).then(res => {
                if(res[0]){
                    return dispatch(notification(res[0].chatMessages.from));
                }
                
                // return res[0];
            }).catch(err => {
                // dispatch(addError(err));
                return err;
            });
        // });
    }
}

export const deleteNotification = username => {
    return dispatch => {
        return apiCall("put", `/api/users/${username}`).then(res => {
            return res;
        }).catch(err => {
            dispatch(addError(err));
        });
    }
}