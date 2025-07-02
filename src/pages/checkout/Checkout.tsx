import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/reducers/store';
import { FaShoppingCart, FaMoneyBillWave, FaWallet, FaMapMarkerAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { clearCart } from '../../redux/reducers/cart/cartSlice';
import { createOrder } from '../../redux/reducers/order/orderSlice';
import {  useNavigate } from 'react-router-dom'
const Checkout = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.user);
  const { items, totalQuantity, totalPrice } = useSelector((state: RootState) => state.carts);
  const { isOrdercreated, isOrderSubmitting } = useSelector((state: RootState) => state.orders);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    try {
      const orderItems = items.map(item => ({
        food: item._id,
        quantity: item.quantity
      }));

      const deliveryAddress = `
        ${formData.address},
        ${formData.apartment ? `Apt: ${formData.apartment},` : ''}
      `.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      dispatch(
        createOrder({
          token,
          items: orderItems,
          deliveryAddress,
          paymentMethod
        })
      );
      dispatch(clearCart());
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    }

  };
  useEffect(() => {
    if (isOrdercreated ) {
      navigate('/order/status');
    }
  }, [isOrdercreated, navigate]);
  return (
    <div className="max-w-5xl  xl:max-w-6xl  mx-auto p-4 md:mt-24">
      <h1 className="text-2xl font-bold mb-8 ml-4 text-gray-900">Checkout</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Address Form */}
        <div className="bg-white rounded-md p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Shipping Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full text-gray-900  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full text-gray-900  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full text-gray-900  pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="House number and street name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full text-gray-900  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                className="w-full text-gray-900  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full text-gray-900  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-gray-900  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-900">Payment Method</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="h-4 w-4 text-black focus:ring-black"
                  />
                  <label htmlFor="cash" className="ml-2 flex items-center text-gray-900">
                    <FaMoneyBillWave className="mr-2 text-gray-900" /> Cash on Delivery
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-black focus:ring-black"
                  />
                  <label htmlFor="card" className="ml-2 flex items-center text-gray-900">
                    <FaWallet className="mr-2 text-gray-900" /> Credit/Debit Card
                  </label>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <button
              type="submit"
              disabled={items.length === 0 || isOrderSubmitting}
              className={`w-full py-3 px-4 rounded-md text-white font-medium flex justify-center items-center ${items.length === 0 || isOrderSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800'
                }`}
            >
              {isOrderSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Place Order (৳${totalPrice.toFixed(2)})`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-md p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Order ({totalQuantity})</h2>

            {items.length === 0 ? (
              <div className="text-center py-8">
                <FaShoppingCart className="mx-auto text-gray-400 text-4xl mb-2" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <FaShoppingCart className="text-gray-400 w-full h-full p-3" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">৳{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-900">Subtotal</span>
                <span className="text-gray-900">৳{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-900">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">৳{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;