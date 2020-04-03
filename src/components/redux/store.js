import { createStore } from 'redux'
import reducers from './reducers'
import { initialState } from './InitialState'
const store = createStore(reducers, initialState);

export default store;
