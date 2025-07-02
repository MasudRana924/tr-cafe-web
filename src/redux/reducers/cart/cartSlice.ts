import { createSlice } from "@reduxjs/toolkit";
import type { Food } from "../../../types/foodTypes";

interface CartItem extends Food {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Helper to load cart items from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

// Helper to calculate total quantity and total price
const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

// Initial state
const storedItems = loadCartFromStorage();
const { totalQuantity, totalPrice } = calculateTotals(storedItems);

const initialState: CartState = {
  items: storedItems,
  totalQuantity,
  totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: { payload: Food }) {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart(state, action: { payload: string }) {
      state.items = state.items.filter(item => item._id !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity(state, action: { payload: { id: string; quantity: number } }) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);
      if (item) {
        item.quantity = quantity;
      }
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.totalPrice;

export default cartSlice.reducer;
