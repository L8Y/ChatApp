const message = (state = [], action) => {
    switch (action.type) {
        case 'loggedIn':
            return state = true
        default:
            return state
    }
}

export default message  