import { TOGGLE_SIDEMENU } from "../actionTypes";


function toggleSidemenu(state = {toggle: false}, action){
    switch(action.type){
        case TOGGLE_SIDEMENU: 
            return {
                toggle: action.toggle
            }
        default:
            return state;
    }
}

export default toggleSidemenu;