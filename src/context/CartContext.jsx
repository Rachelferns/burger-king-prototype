import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.cartId === action.payload.cartId);
      if (existing) {
        return { ...state, items: state.items.map(i => i.cartId === action.payload.cartId ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartId !== action.payload) };
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.cartId !== action.payload.cartId) };
      }
      return { ...state, items: state.items.map(i => i.cartId === action.payload.cartId ? { ...i, qty: action.payload.qty } : i) };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item, addOns = []) => {
    const cartId = `${item.id}_${addOns.map(a => a.id).join('_') || 'plain'}`;
    const addOnsTotal = addOns.reduce((s, a) => s + a.price, 0);
    dispatch({ type: 'ADD_ITEM', payload: { ...item, cartId, addOns, totalPrice: item.price + addOnsTotal } });
  };

  const removeItem = (cartId) => dispatch({ type: 'REMOVE_ITEM', payload: cartId });

  const updateQty = (cartId, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartId, qty } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.totalPrice * i.qty, 0);
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, deliveryFee, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
