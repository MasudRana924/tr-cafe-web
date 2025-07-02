import React, { useState } from 'react';
import { Bell, Check, X, Truck, Gift, Star } from 'lucide-react';
interface Notification {
  id: string;
  type: 'order' | 'delivery' | 'promotion' | 'review';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}
const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order has been confirmed and is being prepared.',
      time: '3 min ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Out for Delivery',
      message: 'Your order is on its way!',
      time: '12 min ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Special Offer',
      message: '40% off Italian cuisine this weekend.',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: '4',
      type: 'review',
      title: 'Rate Your Order',
      message: 'How was your recent order?',
      time: '1 day ago',
      isRead: true,
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(notif => !notif.isRead);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Check className="w-5 h-5 text-green-500" />;
      case 'delivery': return <Truck className="w-5 h-5 text-blue-500" />;
      case 'promotion': return <Gift className="w-5 h-5 text-purple-500" />;
      case 'review': return <Star className="w-5 h-5 text-yellow-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              {unreadCount} unread
            </span>
          )}
          <button
            onClick={markAllAsRead}
            className="text-sm text-orange-600 hover:text-orange-800"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg ${filter === 'unread' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100'}`}
        >
          Unread
        </button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="mx-auto h-8 w-8 mb-2" />
            No notifications found
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.isRead ? 'bg-gray-50' : 'bg-white border-l-4 border-l-orange-500'}`}
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-gray-600 text-sm">{notification.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400">{notification.time}</span>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Notifications;