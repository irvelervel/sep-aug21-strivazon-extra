import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import booksReducer from '../reducers/books'
import cartReducer from '../reducers/cart'
import userReducer from '../reducers/user'

import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// our storage currently points to the localStorage

// my suggestion to start is to think as the FIRST THING about your STORE SHAPE
// I'm planning to use the redux store for sharing the CART and also give to the store
// initial values

// we'll have two situations: the end user may have the redux devTools or not
// if the devTools are installed in the user's browser, we'll have to use the compose function
// coming from them; if the devTools are not installed, we're going to use the compose function
// out of the redux library

const aComposeThatAlwaysWorks = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
  // I'm planning to store the application cart
  cart: {
    content: [],
  },
  user: {
    name: '',
  },
  books: {
    stock: [],
    isError: false,
    isLoading: true,
  },
  // think about the sub-entities you want to save into the redux store
  // the cart deserves more than just an array value, let's create an object for it
  // so if your structure expands in the future you can put into it all the cart-related
  // properties
}

const persistConfig = {
  key: 'root',
  storage,
}

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  books: booksReducer,
})

const persistedBigReducer = persistReducer(persistConfig, bigReducer)

const configureStore = createStore(persistedBigReducer, initialState, aComposeThatAlwaysWorks(applyMiddleware(thunk)))

export const persistor = persistStore(configureStore)

export default configureStore

// redux-thunk is going to be helpful for handling async operations in the redux flow
// now we're injecting the storage logic for making our redux-store persistent
