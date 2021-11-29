export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_BOOKS = 'GET_BOOKS'
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR'
export const TOGGLE_LOADER = 'TOGGLE_LOADER'

// in this file we're going to export our actions
// what

// this is called an ACTION CREATOR
// a function that returns an action (a JS object)

export const addToCartAction = (bookToAdd) => ({
  type: ADD_TO_CART,
  payload: bookToAdd, // this is going to be the book we intend to add to the cart
  // the payload is any other piece of info required by the reducer to understand
  // what we want to do with this action
})

export const removeFromCartAction = (indexToRemove) => ({
  type: REMOVE_FROM_CART,
  payload: indexToRemove,
})
// the function returns an object, so you can dispatch it INSTEAD of dispatching the object

export const setUsernameAction = (name) => ({
  type: SET_USERNAME,
  payload: name, // <- this is the content of the input field in CartIndicator!
})

// EXPLANATION:
// if you have redux-thunk injected in the flow, you can do more with your action creators.
// with redux thunk you can return out of them not just simple actions, but FUNCTIONS.
// and these functions can be even ASYNC, so you can do even FETCHES inside of them!

export const getBooksAction = () => {
  return async (dispatch, getState) => {
    // if you're trying to dispatch something that is NOT an action WITHOUT thunk
    // everything will crash!
    // BUT if you have redux-thunk in the flow, the function you'll eventually dispatch
    // is going to be given by redux-thunk a DISPATCH function as the first argument
    console.log('Hello! this is a thunk action creator', getState().cart.content.length)
    // getState is a function that once invoked will return you the current redux store,
    // so you an even check that out before proceeding if necessary!
    // ...you can do whatever you want here
    // let's do a fetch!
    try {
      const response = await fetch('https://striveschool-api.herokuapp.com/food-books')
      if (response.ok) {
        const data = await response.json()
        // now it's time do to the dispatch
        dispatch({
          type: GET_BOOKS,
          payload: data,
        })
        setTimeout(() => {
          dispatch({
            type: TOGGLE_LOADER,
            payload: false,
          })
        }, 1000)
      } else {
        console.log('Houston, we got an error :(')
        // we can also dispatch ANOTHER action here for the error!
        dispatch({
          type: GET_BOOKS_ERROR,
        })
        dispatch({
          type: TOGGLE_LOADER,
          payload: false,
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_BOOKS_ERROR,
      })
      dispatch({
        type: TOGGLE_LOADER,
        payload: false,
      })
    }
  }
}
