const isLoggedIn = (state = "", action) => {
    switch (action.type) {
        case "userEmail":
            return state = action.paylod
        default:
            return state
    }
}

export default isLoggedIn   