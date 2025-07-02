import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  AuthState,
  LoginCredentials,
  RegisterData,
  VerifyOtpData
} from '../../../types/authTypes';
import { publicPost } from '../../../services/apiCaller';

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

// Helper function for error handling
const handleAuthError = (error: any) => {
  return error.response?.data?.error || 'An unexpected error occurred';
};

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await publicPost('/register', userData);
      // Store email in localStorage
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
      // Clear the email from localStorage after successful verification
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
      return response;
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
      state.status = 'idle';
      state.isAuthenticated = 'loading';
      state.errorMessage = null;
      state.registeredEmail = null;
      localStorage.removeItem('otpVerificationEmail');
    },
    clearError: (state) => {
      state.errorMessage = null;
    },
    clearOtpVerifiedState: (state) => {
      state.isOtpVerified = 'completetd',
        state.isOtpSent = 'completetd'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isOtpSent = 'loading';
        state.errorMessage = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isOtpSent = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isOtpSent = 'failed';
        state.errorMessage = action.payload as string;
        localStorage.removeItem('otpVerificationEmail');
      })
      // OTP verification cases
      .addCase(verifyOtp.pending, (state) => {
        state.isOtpVerified = 'loading';
        state.errorMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isOtpVerified = 'succeeded';
        state.registeredEmail = null;
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
        state.user = action.payload?.user || null;
        state.token = action?.payload?.token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload as string;
      })
  }
});

export const { logout, clearError, clearOtpVerifiedState } = authSlice.actions;
export default authSlice.reducer;