'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NewListingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    pickupTime: '',
   

  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // The auth token is automatically sent thanks to our AuthContext setup
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`, formData);
      setSuccess('Listing created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/listings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create listing.');
    }
  };

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">Create a New Food Listing</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-600">Title</label>
          <input type="text" name="title" onChange={handleChange} required className="text-gray-700 w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="e.g., Leftover Vegetable Curry" />
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" rows="3" onChange={handleChange} required className="text-gray-700 w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Details about the food, ingredients, etc."></textarea>
        </div>
        <div>
          <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
          <input type="text" name="quantity" onChange={handleChange} required className=" text-gray-700 w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="e.g., Serves 15-20 people" />
        </div>
        <div>
          <label htmlFor="pickupTime" className="text-sm font-medium text-gray-700">Latest Pickup Time</label>
          <input type="text" name="pickupTime" onChange={handleChange} required className="text-gray-700 w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="e.g., By 10 PM tonight" />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <div>
          <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            Post Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewListingForm;