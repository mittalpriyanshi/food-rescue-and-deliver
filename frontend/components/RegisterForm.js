'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterForm=()=>{
    const [formData,setFormData]=useState({
        name: '',
        email: '',
        password: '',
        role: 'restaurant', // Default role
        organizationName: '',
        address: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault(); // to stop the default action i.e.page reload
        setError('');

        try{
            const response=await axios.post('http://localhost:5000/api/auth/register', formData)

            console.log('Registration successful:',response.data);
            router.push('/login'); // redirect to login page
        }catch(err){
            console.error('Registration error:',err.response?.data?.msg || 'An error occurred during registration.')
            setError(err.response?.data?.msg || 'An error occurred during registration.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form fields go here */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="name" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black" />
          </div>
          <div>
            <label htmlFor="organizationName" className="text-sm font-medium text-gray-700">Restaurant/NGO Name</label>
            <input type="text" name="organizationName" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black" />
          </div>
           <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="email" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" onChange={handleChange} required minLength="6" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black" />
          </div>
          <div>
            <label htmlFor="role" className="text-sm font-medium text-gray-700">I am a...</label>
            <select name="role" onChange={handleChange} value={formData.role} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black">
              <option value="restaurant">Restaurant</option>
              <option value="ngo">NGO</option>
            </select>
          </div>
          <div>
            <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
            <input type="text" name="address" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black" placeholder="e.g., 123 Main Street" />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" name="phone" onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-black" placeholder="e.g., (123) 456-7890" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );   
};
export default RegisterForm;
