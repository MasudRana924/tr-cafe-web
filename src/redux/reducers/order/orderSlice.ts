import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Order } from "../../../types/orderTypes";
import { privateGet, privatePost } from "../../../services/apiCaller";

export const createOrder = createAsyncThunk(
  "order/create",
  async (
    {
      token,
      items,
      deliveryAddress,
      paymentMethod
    }: {
      token: string;
      items: Array<{ food: string; quantity: number }>;
      deliveryAddress: string;
      paymentMethod: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const orderData = {
        items,
        deliveryAddress,
        paymentMethod
      };
      const response = await privatePost("/orders", token, orderData);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error?.response?.data?.message || "Failed to create order");
    }
  }
);

interface OrderState {
  orders: Order[];
  isOrderSubmitting: boolean;
  isOrdercreated: boolean;
  isOrderfetching: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  isOrderSubmitting: false,
  isOrdercreated: false,
  isOrderfetching: false,
  error: null
};



export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await privateGet("/orders", token);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error?.response?.data?.message || "Failed to create order");
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.isOrderSubmitting = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isOrderSubmitting = false;
      state.isOrdercreated = true;
      state.orders = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isOrderSubmitting = false;
      state.error = action.payload as string;
    })

    builder.addCase(getUserOrders.pending, (state) => {
      state.isOrderfetching = true;
      state.isOrdercreated = true;
      state.error = null;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.isOrderfetching = false;
      state.orders = action.payload; // expecting array of orders
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.isOrderfetching = false;
      state.error = action.payload as string;
    });
  }
});
export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
