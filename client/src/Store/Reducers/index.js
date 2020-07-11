import {combineReducers} from "redux";

import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import user from "./user";
import notifications from "./notifications";

const rootReducer = combineReducers({
    currentUser,
    errors,
    messages,
    user,
    notifications
});

export default rootReducer;