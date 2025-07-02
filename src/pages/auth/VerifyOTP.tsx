import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOtpVerifiedState, verifyOtp } from '../../redux/reducers/auth/authSlice';
import type { AppDispatch, RootState } from '../../redux/reducers/store';
import { useNavigate } from 'react-router-dom';
import showToast from '../../utils/toast';
const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isOtpVerified, } = useSelector((state: RootState) => state.user);
  const registeredEmail = localStorage.getItem('otpVerificationEmail');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    if (isOtpVerified === 'succeeded') {
      navigate('/auth/login');
      dispatch(clearOtpVerifiedState())
        showToast('success','OTP verified successfully')
    }
  }, [dispatch,isOtpVerified, navigate]);
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };
  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6 && registeredEmail) {
      dispatch(verifyOtp({ email: registeredEmail, otp: otpString }));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-50 rounded-md">
        <h2 className="text-2xl font-bold text-start text-gray-900">Verify OTP</h2>
        <p className="text-start text-gray-500 transition-colors ">
          We've sent a 6-digit code to <span className='text-orange-500'>{registeredEmail}</span>
        </p>

        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (otpRefs.current[index] = el)}
              className="w-12 h-12 text-gray-900 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 mt-8 mb-4"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.join('').length !== 6 || status === 'loading'}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${otp.join('').length !== 6 || status === 'loading'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gray-900 hover:bg-gray-700'
            }`}
        >
          {isOtpVerified === 'loading' ? 'Verifying...' : 'Verify OTP'}
        </button>

        <div className="text-center text-sm text-gray-500">
          Didn't receive code?{' '}
          <button className="text-gray-900 hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;