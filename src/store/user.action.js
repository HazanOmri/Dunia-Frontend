import { ADD_TO_CART, LIKE_ITEM, REMOVE_FROM_CART, SET_USER, UNLIKE_ITEM } from './user.reducer.js'
import { store } from './store.js'
import { showAddItemMsg, showLikeMsg, showUnlikeMsg } from '../services/event-bus.service.js'


export async function setUser(user) {
    try {
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log('Cant set filter', err)
    }
}

export async function toggleLike(itemId, isLiked) {
    try {
        if (isLiked) {
            store.dispatch({ type: UNLIKE_ITEM, itemId })
            showUnlikeMsg('הפריט הוסר מרשימת פריטים אהובים')
        } else {
            store.dispatch({ type: LIKE_ITEM, itemId })
            showLikeMsg('הפריט נוסף לרשימת פריטים אהובים')
        }
    } catch (err) {
        console.log('Cannot like item', err)
    }
}

export async function addToCart(itemId) {
    try {
        store.dispatch({ type: ADD_TO_CART, itemId })
        showAddItemMsg('הפריט נוסף לסל')
    } catch (err) {
        console.log('Cannot add item', err)
    }
}

export async function changeAnount(itemId, qty) {
    try {
        store.dispatch({ type: ADD_TO_CART, itemId, qty })
    } catch (err) {
        console.log('Cannot add item', err)
    }
}

export function removeFromCart(itemId) {
    try {
        store.dispatch({ type: REMOVE_FROM_CART, itemId })
    } catch (err) {
        console.log('Cannot add item', err)
    }
}