'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

// create a context for authentication
const AuthContext = createContext({
  user: null,
  session: null,
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>('loading');
  const [userID, setUserID] = useState<any>('loading');
  const [session, setSession] = useState<any>('loading');

  const clearUserData = () => {
    setUser(null);
    setSession(null);
    setUserID(null);
  };
  const supabase = createClient();

  const getUserProfile = async () => {
    const sessionUser = await supabase.auth.getUser();

    if (sessionUser?.data?.user?.id) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser?.data?.user?.id)
        .maybeSingle();

      //* STORING LOGGED IN USER DATA
      setUser({
        ...sessionUser?.data?.user,
        profileData: { ...profile },
      });

      if (userID === 'loading') setUserID(sessionUser?.data?.user?.id);
    } else {
      return clearUserData();
    }

    //* GETTING SESSION
    const {
      data: { session: sessionData },
      error,
    } = await supabase.auth.getSession();

    setSession(sessionData);
  };

  useEffect(() => {
    getUserProfile();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      getUserProfile();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    clearUserData();
  };
  const value = {
    user,
    session,
    logout,
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!(session === 'loading') && children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  return useContext(AuthContext);
};
