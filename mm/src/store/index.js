import { createStore, combineReducers } from 'redux'
import { shopList } from './reducers';
const reducer = combineReducers({
    shopList
})

const store = createStore(reducer);
window.store = store;
export default store;