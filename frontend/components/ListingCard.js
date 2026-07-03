'use client';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { useState } from 'react';

const ListingCard = ({ listing }) => {
  const { isAuthenticated, user } = useAuth();
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = async () => {
    if (!confirm('Are you sure you want to claim this food listing?')) {
      return;
    }
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/claim/${listing._id}`);
      alert('Food claimed successfully! Please coordinate pickup with the restaurant.');
      setIsClaimed(true);
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to claim food.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{listing.title}</h3>
        <p className="text-gray-600 mb-4">{listing.description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          <p><strong>Restaurant:</strong> {listing.restaurantId.organizationName}</p>
          <p><strong>Quantity:</strong> {listing.quantity}</p>
          <p><strong>Pickup Address:</strong> {listing.restaurantId.address}</p>
          <p><strong>Pickup By:</strong> {listing.pickupTime}</p>
          <p><strong>Phone Number:</strong> {listing.restaurantId.phone}</p>
        </div>

        {isAuthenticated && user?.role === 'ngo' && (
          <button 
            onClick={handleClaim}
            disabled={isClaimed}
            className={`mt-4 w-full font-bold py-2 px-4 rounded-lg transition duration-300 ${isClaimed ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
          >
            {isClaimed ? 'Claimed' : 'Claim Food'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;