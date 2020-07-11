import { GET_NOTIFICATION } from "../actionTypes";

const defaultState = {
    from: ""
}

function notications(state = defaultState, action){
    switch(action.type){
        
        case GET_NOTIFICATION:
            return {
                from: action.from
            }
        default:
            return state;
    }
}

export default notications;