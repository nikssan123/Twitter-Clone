import { TOGGLE_SIDEMENU } from "../actionTypes";

export function toggleSidemenu(toggle){
    return {
        type: TOGGLE_SIDEMENU,
        toggle
    };
}
