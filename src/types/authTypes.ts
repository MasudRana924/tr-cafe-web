export interface User {
  email?: string;
}
export interface AuthState {
  isAuthenticated: 'loading' | 'success';
  user: User | null;
  token: null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorMessage: string | null;
  registeredEmail: string | null;
  isOtpSent: 'idle' | 'loading' | 'succeeded' | 'failed' | 'completetd';
  isOtpVerified: 'idle' | 'loading' | 'succeeded' | 'failed' | 'completetd';
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterData {
  email: string;
  password: string;
}
export interface VerifyOtpData {
  email: string;
  otp: string;
}