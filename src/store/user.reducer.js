// import { userService } from '../service/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    user: { name: 'Omri', age: 24 },
    users: null
}


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case SET_USERS:
            return { ...state, users: action.users }
        default:
            return state
    }
}

