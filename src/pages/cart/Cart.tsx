import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart
} from '../../redux/reducers/cart/cartSlice';
import { FaTrash, FaShoppingCart, FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';
import type { RootState } from '../../redux/reducers/store';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalQuantity, items, totalPrice } = useSelector((state: RootState) => state.carts);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      handleRemove(id);
    }
  };

  return (
    <div className=" relative p-4 max-w-5xl 2xl:max-w-6xl mx-auto md:mt-24 mb-24">
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white ">
          <FaShoppingCart className="mx-auto text-red-500 text-6xl mb-4" />
          <p className="text-gray-900 text-lg">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="bg-white rounded-md  p-6 grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2  pr-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Cart ({totalQuantity})</h2>
              <button
                onClick={() => dispatch(clearCart())}
                className="text-sm bg-gray-100 border rounded-md p-1 border-gray-100 text-red-500 hover:text-red-700"
              >
                Clear All
              </button>
            </div>

            {items.map(item => (
              <div key={item._id} className="flex items-start gap-4 py-4 border-b border-gray-200">
                <div className="w-30 h-30 bg-gray-100 rounded-md ">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <FaShoppingCart className="text-gray-400 w-full h-full p-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 transition-colors">{item.name}</h4>
                      <p className="text-sm text-gray-900 transition-colors">৳{item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-gray-900 hover:text-red-500"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center  rounded-md overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-900 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-4 transition-colors">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-900 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    <p className="text-sm font-medium">৳{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 p-5 rounded-md max-h-[60vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Order Summary</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className='text-gray-900'>Subtotal</span>
                <span className='text-gray-900'>৳{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-4">
                <span className='text-gray-900'>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between mt-4">
                <span className='text-gray-900'>Tax </span>
                <span className='text-gray-900'>৳ 0.00</span>
              </div>
            </div>

            <hr className="my-4 " />

            <div className="flex justify-between font-semibold text-base mb-4">
              <span className='text-gray-900'>Total</span>
              <span className='text-gray-900'>৳{totalPrice.toFixed(2)}</span>
            </div>

            <Link to="/checkout">
              <button
                className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                Checkout <FaArrowRight />
              </button></Link>

            <p className="text-xs text-gray-900 mt-3 text-center">
              Free shipping on orders over ৳500
            </p>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Cart;
