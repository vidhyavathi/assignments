const initialState = {
  cart: {
    items: [],
    quantity: {}
  },
  price: {
    totalItems: 0,
    itemsPrice: 0,
    discount: 0,
    totalPrice: 0
  }
}

const updateLocalStorage = (cart) => {
  localStorage.setItem('RR_SHOPPING_CART', JSON.stringify(cart));
}

const addItems = (state = initialState.cart, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART':
      if(!state.quantity[action.item.id]) {
        state.quantity[action.item.id] = 1;
        state.items.push(action.item);
        updateLocalStorage(state);
        return {
          ...state		
        };
      } else {
        state.quantity[action.item.id]++;
        updateLocalStorage(state);
        return {...state};
    }
    case 'REMOVE_ITEM_FROM_CART':
        state.items.forEach((item, i) => {
          if(item.id === action.item.id) {
              state.items.splice(i, 1);
          }
        });
        delete state.quantity[action.item.id];
        updateLocalStorage(state);
        return state;
    case 'UPDATE_ITEM_IN_CART':
        state.quantity[action.item.id] = action.item.quantity;
        updateLocalStorage(state);
        return state;
    default:
      return state
  }
}


const calculateItemsFromQuantity = (quantity) => {
    var total = 0;
    for(var q in quantity) {
      total += (quantity[q]);
    }
    return total;
}

const calculateDiscount = (price, discount, quantity) => {
    return ((price * quantity) - Math.round(((price * quantity) * discount)/100));
}

const getPriceDetails = (cart, priceState) => {
  if(cart.items.length) {
      let price = {
        totalItems: 0,
        itemsPrice: 0,
        discount: 0,
        totalPrice: 0
      };
      price.totalItems = calculateItemsFromQuantity(cart.quantity);
      cart.items.forEach((item) => {
        price.itemsPrice += (item.price * cart.quantity[item.id]);
        price.totalPrice += calculateDiscount(item.price, item.discount, cart.quantity[item.id]);
      });
      price.discount = price.itemsPrice - price.totalPrice;
      priceState = price;
  }
  return priceState;
}

const calculatePrice = (state = initialState.price, action) => {
    switch (action.type) {
      case 'ADD_ITEM_TO_CART':
        return {
          ...state,
          totalItems: (state.totalItems + 1)
        };
      case 'REMOVE_ITEM_FROM_CART':
        return {
          ...state,
          totalItems: (state.totalItems - action.item.quantity)
        };
      case 'GET_PRICE_DETAILS':
        return getPriceDetails(action.cart, state); 
      default:
        return state;
    }
}

const cart = (state = initialState, action) => {
  switch (action.type) {    
    case 'GET_CART_ITEMS':
      let cartItems = action.cart;
      let cartState = {
        price: getPriceDetails(cartItems, state.price),
        cart: cartItems
      };
      return cartState;
    default:
      let items = addItems(state.cart, action);
      let price = calculatePrice(state.price, action);
      return {
        cart: items,
        price
      }
  }
}

export default cart;