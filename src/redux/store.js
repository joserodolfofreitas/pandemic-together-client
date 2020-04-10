import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { initialState } from './InitialState'
const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
