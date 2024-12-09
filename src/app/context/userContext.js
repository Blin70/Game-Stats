'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) console.error('Error while getting user from supabase', error);
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (loading) return null;

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => useContext(UserContext);