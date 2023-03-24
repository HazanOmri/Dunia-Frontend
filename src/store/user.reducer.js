// import { userService } from '../service/user.service.js'

import { showAddItemMsg, showRemoveItemMsg } from "../services/event-bus.service"
import { userService } from "../services/user.service"

export const SET_USER = 'SET_USER'
export const LIKE_ITEM = 'LIKE_ITEM'
export const UNLIKE_ITEM = 'UNLIKE_ITEM'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const initialState = {
    user: { id: '', liked: [], cart: {} },
}

export function userReducer(state = initialState, action) {
    let user = { ...state.user }
    // console.log('user', user)
    switch (action.type) {
        case SET_USER:
            userService.saveLocalUser(action.user)
            return { ...state, user: action.user }
        case LIKE_ITEM:
            user.liked.push(action.itemId)
            userService.saveLocalUser(user)
            return { ...state, user }
        case UNLIKE_ITEM:
            user.liked = user.liked.filter(id => id !== action.itemId)
            userService.saveLocalUser(user)
            return { ...state, user }
        case ADD_TO_CART:
            if (action.qty) {
                user.cart[action.itemId] = action.qty
            } else {
                if (user.cart[action.itemId]) {
                    user.cart[action.itemId] = user.cart[action.itemId] + 1
                } else {
                    user.cart[action.itemId] = 1
                }
            }
            userService.saveLocalUser(user)
            return { ...state, user }
        case REMOVE_FROM_CART:
            let newCart = {}
            for (const itemId in user.cart) {
                if (action.itemId !== itemId) newCart[itemId] = user.cart[itemId]
            }
            user.cart = newCart
            userService.saveLocalUser(user)
            showRemoveItemMsg('הפריט הוסר מהסל')
            return { ...state, user }
        default:
            return state
    }
}

