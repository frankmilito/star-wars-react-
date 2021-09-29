import { combineReducers } from 'redux'
import { filmReducer } from './reducers/filmReducer'

const reducers = combineReducers({
  film: filmReducer,
})

export default reducers
