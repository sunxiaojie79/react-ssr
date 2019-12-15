import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

// const store = createStore(reducer, applyMiddleware(thunk))

export const getClientStore = () => {
  console.log(1)
  const defualtState = window.__context ? window.__context : {} 
  return createStore(reducer, defualtState, applyMiddleware(thunk))
}

export const getServerStore = () => {
  console.log(2)

  return createStore(reducer, applyMiddleware(thunk))
}