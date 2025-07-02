import React, { useState } from 'react';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation (you can enhance this)
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // You can dispatch Redux action or call API here
    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <div className="max-w-md  p-6 bg-gray-50 rounded-md mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
