import { combineReducers } from 'redux';
import items from './items';
import cart from './cart';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  items,
  cart,
  routing: routerReducer
})

export default rootReducer;