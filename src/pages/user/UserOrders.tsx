import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/reducers/store";
import { getUserOrders } from "../../redux/reducers/order/orderSlice";

const UserOrders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.user);
  const { orders, isOrderfetching, error } = useSelector((state: RootState) => state.orders);

  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (token) {
      dispatch(getUserOrders(token));
    }
  }, [dispatch, token]);

  const toggleOrderDetails = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    (() => newExpanded.has(orderId) ? newExpanded.delete(orderId) : newExpanded.add(orderId))();

    setExpandedOrders(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="animate-pulse">
        {Array.from({ length: 7 }).map((__, idx) => (
          <td key={idx} className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            My Orders
          </h1>
          <p className="text-gray-600 mt-2">Track and manage your previous orders</p>
        </div>

        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isOrderfetching
                  ? renderSkeletonRows()
                  : orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-900">#{order._id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${getPaymentStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">
                              via {order.paymentMethod}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleOrderDetails(order._id)}
                            className="flex items-center gap-2 text-red-600 hover:underline focus:outline-none text-sm font-medium"
                          >
                            {expandedOrders.has(order._id) ? "Hide Details" : "View Details"}
                            {expandedOrders.has(order._id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {expandedOrders.has(order._id) && (
                        <tr>
                          <td colSpan={7} className="px-6 py-6 bg-gray-50">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Items */}
                              <div>
                                <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                  <Package className="w-5 h-5 text-blue-600" />
                                  Order Items
                                </h4>
                                <div className="space-y-4">
                                  {order.items.map((item) => (
                                    <div key={item._id} className="bg-white p-3 rounded-xl border shadow-sm flex items-center gap-4">
                                      <img
                                        src={item.food.image}
                                        alt={item.food.name}
                                        className="w-14 h-14 object-cover rounded-lg border"
                                      />
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-900 text-sm">{item.food.name}</p>
                                        <div className="flex justify-between mt-1 text-xs text-gray-600">
                                          <span>Qty: {item.quantity}</span>
                                          <span className="font-semibold text-gray-800">
                                            {formatCurrency(item.price * item.quantity)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Info */}
                              <div>
                                <h4 className="text-base font-semibold text-gray-800 mb-4">Order Info</h4>
                                <div className="bg-white p-4 rounded-md border border-gray-100 space-y-4 text-sm text-gray-700">
                                  <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                      <p className="font-medium text-gray-900">Delivery Address</p>
                                      <p>{order.deliveryAddress}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-gray-400" />
                                    <div>
                                      <p className="font-medium text-gray-900">Payment Method</p>
                                      <p className="capitalize">{order.paymentMethod}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                      <p className="font-medium text-gray-900">Order Timeline</p>
                                      <p>Placed: {formatDate(order.createdAt)}</p>
                                      <p>Updated: {formatDate(order.updatedAt)}</p>
                                    </div>
                                  </div>
                                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-gray-900 font-semibold">
                                    <span>Total:</span>
                                    <span className="text-blue-600 font-bold text-lg">{formatCurrency(order.totalAmount)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {!isOrderfetching && orders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 text-red-500">
              <p>Error: {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
