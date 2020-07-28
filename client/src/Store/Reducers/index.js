import {combineReducers} from "redux";

import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import user from "./user";
import users from "./users";
import notifications from "./notifications";


const rootReducer = combineReducers({
    currentUser,
    errors,
    messages,
    user,
    users,
    notifications
});

export default rootReducer;