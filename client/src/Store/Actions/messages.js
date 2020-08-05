import { apiCall } from "../../Services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE, REMOVE_MESSAGES} from "../actionTypes";


export const loadMessages = messages => {
    return {
        type: LOAD_MESSAGES,
        messages
    };
}

export const removeMessages = () => {
    return {
        type: REMOVE_MESSAGES
    }
}

export const remove = id => {
    return {
        type: REMOVE_MESSAGE,
        id
    }
}

export const removeMessage = (user_id, message_id) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
            .then(() => dispatch(remove(message_id)))
            .catch(err => dispatch(addError(err.message))); 
    }
}

export const fetchMessages = page => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("get", `/api/messages/${page}`).then(res => {
                dispatch(loadMessages(res));
                resolve(res);
            }).catch(err => {
                dispatch(addError(err.message));
                reject();
            });
        })
        
    }
}

export const postNewMessage = text => (dispatch, getState) => {
    let { currentUser } = getState();
    const id  = currentUser.user.id;
    return apiCall("post", `/api/users/${id}/messages`, { text }).then(res => {

    }).catch(err => dispatch(addError(err.message)));
};