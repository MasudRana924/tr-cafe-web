import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl  bg-gray-50  s rounded-lg mt-12">
      <div className="flex flex-col items-center gap-6 mb-6 p-6">
        <div className="relative w-32 h-32">
          <img
            src={selectedImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border border-gray-300"
          />
          <label htmlFor="imageUpload" className="absolute bottom-0 right-0 bg-red-500 p-1 rounded-full cursor-pointer">
            <Pencil size={16} className="text-white" />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border text-gray-900 border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border text-gray-900  border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Enter your phone"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border text-gray-900 border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border text-gray-900 border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Last name"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-900">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border text-gray-900 border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Your address"
              rows={3}
            />
          </div>
          <button className='bg-gray-900 h-12'>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
