import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import authSlice from "../reducers/auth/authSlice";
import foodSlice from "../reducers/food/foodsSlice";
import cartSlice from "../reducers/cart/cartSlice";
import orderSlice from "../reducers/order/orderSlice";
const persistConfig = {
  key: "authentication",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);
const combinedReducer = {
  user: persistedReducer,
  foods: foodSlice,
  carts: cartSlice,
  orders: orderSlice
};
const middlewares: any[] = [];
if (import.meta.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
