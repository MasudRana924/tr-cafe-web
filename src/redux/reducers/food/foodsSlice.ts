import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicGet } from '../../../services/apiCaller';
import type { FoodFilter, FoodState } from '../../../types/foodTypes'


// Initial state
const initialState: FoodState = {
  foods: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "",
  },
};

// Async thunk
export const fetchFoods = createAsyncThunk(
  "food/fetchFoods",
  async (filters: FoodFilter) => {
    const query = new URLSearchParams();
    if (filters.category) query.append("category", filters.category);
    if (filters.minPrice) query.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) query.append("maxPrice", filters.maxPrice.toString());
    if (filters.sortBy) query.append("sortBy", filters.sortBy);

    return await publicGet(`/foods?${query.toString()}`);
  }
);

// Slice
const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch foods";
      });
  },
});

export const { setFilters, clearError } = foodSlice.actions;
export default foodSlice.reducer;