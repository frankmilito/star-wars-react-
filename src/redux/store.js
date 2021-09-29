import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './combineReducers'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
// const store = createStore(reducers, applyMiddleware(thunk))

export default store
