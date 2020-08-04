import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

function message(state = [], action){
    switch(action.type){
        case LOAD_MESSAGES:
            return [...state, ...action.messages];
        case REMOVE_MESSAGE: 
            return state.filter(message => {
                return message._id !== action.id
            });
        default:
            return state;
    }
}

export default message;