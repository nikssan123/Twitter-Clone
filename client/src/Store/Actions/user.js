import { apiCall } from "../../Services/api";
import { SHOW_USER_INFO, DELETE_USER_MESSAGE } from "../actionTypes";
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