import { GET_ALL_USERS } from "../actionTypes";

const defaultState = {
    users: []
}

function users(state = defaultState, action){
    switch(action.type){
        case GET_ALL_USERS: 
            return {
                users: [...action.users]
            }
        default:
            return state;
    }
}

export default users;