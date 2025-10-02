import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user';
  enrolledBatches: string[];  
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ user: User; token: string } | null>;
  logout: () => void;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Base URL of your backend
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

  useEffect(() => {
    const storedUser = localStorage.getItem('fxstreampro_user');
    const token = localStorage.getItem('fxstreampro_token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ user: User; token: string } | null> => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      const { token, user } = res.data;
  
      setUser(user);
      localStorage.setItem('fxstreampro_user', JSON.stringify(user));
      localStorage.setItem('fxstreampro_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      return { user, token }; // ✅ return both user and token
    } catch (err) {
      console.error('Login failed:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const signup = async (name: string, email: string, password: string, phone: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        
        fullName: name,
        email,
        password,
        phone,
       
        role: 'user', // default role
      });

      // Optionally login after registration or redirect to login page
      return true;
    } catch (err) {
      console.error('Signup failed:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fxstreampro_user');
    localStorage.removeItem('fxstreampro_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
