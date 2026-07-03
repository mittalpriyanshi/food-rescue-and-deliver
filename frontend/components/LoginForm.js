'use client'
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const LoginForm=()=>{
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Send login request to the backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, formData);

      login(response.data.token);
    } catch (err) {
      console.error('Login error:', err.response?.data?.msg || 'An error occurred.');
      setError(err.response?.data?.msg || 'Invalid credentials.');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="email" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;