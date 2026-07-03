'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const DashboardPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // Protect the route
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }

    // Fetch data based on user role
    if (isAuthenticated && user) {
      const fetchData = async () => {
        const url = user.role === 'restaurant'
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/listings/mylistings`
  : `${process.env.NEXT_PUBLIC_API_URL}/api/listings/claimed`;

        try {
          const res = await axios.get(url);
          setListings(res.data);
        } catch (err) {
          console.error('Failed to fetch dashboard data', err);
        } finally {
          setDataLoading(false);
        }
      };
      fetchData();
    }
  }, [user, isAuthenticated, loading, router]);

  if (loading || dataLoading) {
    return <p className="text-center mt-8">Loading Dashboard...</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-200 mb-6">Welcome, {user?.organizationName}!</h1>

      {user?.role === 'restaurant' ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Posted Listings</h2>
          {/* Restaurant's view of their listings */}
          <div className="space-y-4">
            {listings.length > 0 ? listings.map(item => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-gray-500">{item.title}</h3>
                <p className='text-gray-500'>Status: <span className={`font-semibold ${item.status === 'available' ? 'text-green-600' : 'text-yellow-600'}`}>{item.status}</span></p>
                {item.status === 'claimed' && item.claimedByNgoId && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>Claimed by:</strong> {item.claimedByNgoId.organizationName}</p>
                    <p><strong>NGO Phone Number:</strong> {item.claimedByNgoId.phone}</p>
                  </div>
                )}
              </div>
            )) : <p>You have not posted any listings.</p>}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Claimed Listings</h2>
          {/* NGO's view of their claimed listings */}
          <div className="space-y-4">
            {listings.length > 0 ? listings.map(item => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow text-gray-500">
                <h3 className="font-bold">{item.title}</h3>
                <p>From: {item.restaurantId.organizationName}</p>
                <p>Address: {item.restaurantId.address}</p>
                <p> Pickup By: {item.pickupTime}</p>
                <p>Phone: {item.restaurantId.phone}</p>
              </div>
            )) : <p>You have not claimed any listings yet.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;