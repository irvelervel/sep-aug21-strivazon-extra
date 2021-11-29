import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions'
import { initialState } from '../store'

// the reducer's job is ALWAYS to return a valid state for the application
// the SHAPE of the state you're supposed to return from every case is the SAME
// as the initialValue you're providing to it

// a PURE FUNCTION never mutates its arguments

const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        content: [...state.content, action.payload], // <- just my preference
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        content: state.content.filter((el, i) => i !== action.payload), // <- it works!
      }
    default:
      return state
  }
}

export default cartReducer
