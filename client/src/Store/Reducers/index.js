import {combineReducers} from "redux";

import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import user from "./user";

const rootReducer = combineReducers({
    currentUser,
    errors,
    messages,
    user
});

export default rootReducer;