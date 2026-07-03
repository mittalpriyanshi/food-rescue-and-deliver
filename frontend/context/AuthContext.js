'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AuthContext = createContext(null);

// Utility to set the auth token for all axios requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`);
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        // If token is invalid
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    loadUser(); // Load user data after login
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};