
    import isLoggedIn from "./isLoggedIn";
    import message from "./message";
    import { combineReducers } from "redux";

    const allReducers = combineReducers({
        isLogged: isLoggedIn,
        mesg: message
    });

    export default allReducers