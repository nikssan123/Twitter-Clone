import { SET_CURRENT_USER, NEW_CHAT_MESSAGE } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    chatMessages: {
        from: "",
        messages: []
    }
};

export default function (state = DEFAULT_STATE, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                isAuthenticated: Boolean(Object.keys(action.user).length),
                user: action.user
            };
        case NEW_CHAT_MESSAGE:
            const chatMessages = {
                from: action.from,
                messages: [...state.chatMessages.messages, action.newMessage]
            }
            return {
                ...state,
                chatMessages
            }
        default:
            return state;
    }
}