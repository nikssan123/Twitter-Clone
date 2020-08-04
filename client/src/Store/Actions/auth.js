import { apiCall, setTokenHeader } from "../../Services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logout(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({token, ...user}) => {
                    // console.log(user);
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve();
                }).catch(err => {
                    dispatch(addError(err.message));
                    reject();
                });
        })
    }
}

export function editUser(data, id){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("put", `/api/auth/${id}/settings`, data).then(({token, ...user}) => {
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                // dispatch(removeError());
                dispatch(addError( "You successfully edited your account settings!"));
                resolve();
            }).catch(err => {
                dispatch(addError(err.message));
                reject();
            });
        })
    }
}

export function updatePassword(data, token){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("put", `/api/auth/reset/${token}`, data).then(({message}) => {
                dispatch(addError({text: message, type: "success"}));
                resolve();
            }).catch(err => {
                dispatch(addError({text: err.message, type: "danger" }));
                reject();
            });
        })
    }
}

export function deleteUser(id){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("delete", `/api/auth/${id}`).then(() => {
                resolve();
            }).catch(err => {
                debugger;
                reject(err);
            });
        });
    }
}

