import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  AuthState,
  LoginCredentials,
  RegisterData,
  VerifyOtpData
} from '../../../types/authTypes';
import { publicPost } from '../../../services/apiCaller';
import { AxiosError } from 'axios';

const initialState: AuthState = {
  isAuthenticated: 'loading',
  user: null,
  token: null,
  status: 'idle',
  errorMessage: null,
  registeredEmail: null,
  isOtpSent: 'idle',
  isOtpVerified: 'idle'
};

// Simplified error handler
const handleAuthError = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data?.error) {
    return error.response.data.error;
  }
  return 'An unexpected error occurred';
};

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await publicPost('/register', userData);
      localStorage.setItem('otpVerificationEmail', userData.email);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (otpData: VerifyOtpData, { rejectWithValue }) => {
    try {
      const response = await publicPost('/verify-otp', otpData);
      localStorage.removeItem('otpVerificationEmail');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await publicPost('/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAuthError(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = 'loading';
      state.errorMessage = null;
      state.registeredEmail = null;
      localStorage.removeItem('otpVerificationEmail');
    },
    clearError: (state) => {
      state.errorMessage = null;
    },
     clearOtpVerifiedState: (state) => {
      state.isOtpVerified = 'completetd';
      state.isOtpSent = 'completetd';
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isOtpSent = 'loading';
        state.errorMessage = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isOtpSent = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isOtpSent = 'failed';
        state.errorMessage = action.payload as string;
      })

      // OTP verification cases
      .addCase(verifyOtp.pending, (state) => {
        state.isOtpVerified = 'loading';
        state.errorMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isOtpVerified = 'succeeded';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isOtpVerified = 'failed';
        state.errorMessage = action.payload as string;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = 'success';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload as string;
      });
  }
});

export const { logout, clearError, clearOtpVerifiedState } = authSlice.actions;
export default authSlice.reducer;