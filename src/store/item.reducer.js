export const SET_FILTER = 'SET_FILTER'

const initialState = {
    filter: { txt: '', price: 500 },
}


export function itemReducer(state = initialState, action) {
    // console.log('state', state)
    switch (action.type) {
        case SET_FILTER:
            return { ...state, filter: action.filter }
        default:
            return state
    }
}