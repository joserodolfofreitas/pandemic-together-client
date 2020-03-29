import { createStore } from 'redux'
import reducers from './reducers'
import { initialState } from './InitialState'
const ClientStore = createStore(reducers, initialState);

export default ClientStore;
