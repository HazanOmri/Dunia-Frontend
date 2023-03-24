import { SET_FILTER } from './item.reducer.js'
import { store } from './store.js'


export async function setFilter(filter) {
    try {
        store.dispatch({ type: SET_FILTER, filter })
    } catch (err) {
        console.log('Cant ser filter', err)
    }
}