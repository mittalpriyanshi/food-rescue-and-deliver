'use client'; // <-- MAKE THIS A CLIENT COMPONENT

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NotificationToast from '@/components/NotificationToast';

const inter = Inter({ subsets: ['latin'] });

// We create a new component to access the Auth context
function AppContent({ children }) {
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Only connect if the user is an NGO
    if (user?.role === 'ngo') {
      const socket = io(process.env.NEXT_PUBLIC_API_URL);

      socket.on('newListing', (newListing) => {
        // Fetch full restaurant details
        const fullListing = { ...newListing, restaurantId: { organizationName: 'a restaurant' } };
        setNotification(fullListing);
        
        // Hide notification after 10 seconds
        setTimeout(() => {
          setNotification(null);
        }, 10000);
      });

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [user]); // Re-run effect if user changes

  return (
    <>
      {children}
      <NotificationToast listing={notification} onClose={() => setNotification(null)} />
    </>
  );
}

export default function RootLayout({ children }) {
  // Metadata is now an object, not exported
  const metadata = {
    title: 'Food Rescue Hub | Connecting restaurants with NGOs to reduce food waste. ',
    description: 'Food Rescue Hub helps restaurants donate excess food to NGOs and reduce food waste.',
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>
            <AppContent>{children}</AppContent>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}