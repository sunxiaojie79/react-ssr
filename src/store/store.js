import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'
import axios from 'axios'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

const serverAxios = axios.create({
  baseURL: "http://localhost:9090/"
})
const clientAxios = axios.create({
  baseURL: "/"
})
// const store = createStore(reducer, applyMiddleware(thunk))

export const getClientStore = () => {
  console.log(1)
  const defualtState = window.__context ? window.__context : {} 
  return createStore(reducer, defualtState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}

export const getServerStore = () => {
  console.log(2)

  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}