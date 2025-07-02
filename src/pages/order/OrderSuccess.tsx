import React from 'react';
import { CheckCircle ,Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccess: React.FC = () => {

  return (
    <div className="min-h-screen text-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle className="w-24 h-24 text-green-500" />
            <div className="absolute inset-0 animate-ping">
              <CheckCircle className="w-24 h-24 text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">Order Successful!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
         
          <Link to="/user/orders/list">
          <button
            
            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-gray-600"
          >
            View Order Details
          </button></Link>

          <Link to="/">
          <button
           
            className="mt-4 w-full bg-transparent hover:bg-gray-900 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-gray-700 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button></Link>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>A confirmation email has been sent to your registered email address.</p>
          <p>Need help? Contact our support team anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;