import { SHOW_USER_INFO, DELETE_USER_MESSAGE } from "../actionTypes";

const defaultState = {
    user: {},
    messages: [],
}

function user(state = defaultState, action){
    switch(action.type){
        case SHOW_USER_INFO: 
            return {
                user: action.user,
                messages: action.messages
            }
        case DELETE_USER_MESSAGE:
            const newMessages = state.messages.filter(message => {
                return message._id !== action.id
            });
            return {
                ...state,
                messages: newMessages
            }
        default:
            return state;
    }
}

export default user;