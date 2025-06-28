/** @format */

import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, fullname) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Signup error:", error);
        return { data: null, error };
      }

      const userId = data.user.id;

      // Insert profile with user_id instead of id
      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .insert([
          {
            user_id: userId, // Use user_id to link to the auth user
            fullname: fullname,
            email: email,
          },
        ]);

      if (profileError) {
        console.error("Profile insert error:", profileError);
        return { data: null, error: profileError };
      }

      return { data: { user: data.user, profile: profileData }, error: null };
    } catch (err) {
      console.error("Unexpected error occurred:", err);
      return { data: null, error: err };
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
