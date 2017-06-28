import ITEMS from '../mock/items';
import * as types from '../constants/actionTypes';

export function getCartItems() {
    let cartItems = localStorage.getItem('RR_SHOPPING_CART');
    try {
        cartItems = JSON.parse(cartItems) || {items: [], quantity: {}};
    } catch(e) {
        console.log(e);
    }
    return {
      type: types.GET_CART_ITEMS,
      cart: cartItems
    }
}

// Get items
export function getItems() {
  return {
    type: types.GET_ITEMS,
    items: ITEMS
  }
}

// Get price details
export function getPriceDetails(cart) {
    return {
      type: types.GET_PRICE_DETAILS,
      cart
    }
}

export function addItem(item) {
    return {
      type: types.ADD_ITEM_TO_CART,
      item
    }
}

export function updateQuantity(itemId, quantity) {
  return {
    type: types.UPDATE_ITEM_IN_CART,
    item: {
      id: itemId,
      quantity
    }
  }
}

export function removeItemFromCart(itemId, quantity) {
  return {
    type: types.REMOVE_ITEM_FROM_CART,
    item: {
      id: itemId,
      quantity
    }
  }
}