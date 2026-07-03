'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from '@/components/ListingCard';

const ListingsPage=()=>{
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchListings=async()=>{
            try{
                const response=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`);
                setListings(response.data);
            }catch(err){
                setError('Failed to fetch listings.Please try again later.');
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        fetchListings();
    },[]);

    if (loading) {
    return <p className="text-center mt-8">Loading available food...</p>;
  }
  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Food Listings</h1>
        {listings.length === 0 ? (
          <p className="text-gray-500"> No available food listings at the moment. Please check back later.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default ListingsPage;