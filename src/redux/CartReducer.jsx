const initialData = {
  cart_items: [],
};

const cartReducer = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // add item only if not already in cart
      const item = action.payload;
      if (!item) return state;
      const exists = state.cart_items.find((i) => String(i.id) === String(item.id));
      if (exists) return state;
      return { ...state, cart_items: [...state.cart_items, item] };
    }

    case "REMOVE_FROM_CART": {
      // payload can be the item id or the item object
      const id = action.payload && action.payload.id ? action.payload.id : action.payload;
      return { ...state, cart_items: state.cart_items.filter((i) => String(i.id) !== String(id)) };
    }

    case "CLEAR_CART":
      return { ...state, cart_items: [] };

    default:
      return state;
  }
};

export default cartReducer;
