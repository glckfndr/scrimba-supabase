import { createContext, useContext, useState } from "react";
import supabase from "../supabase-client";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
        console.log(data.session);
      } catch (err) {
        console.log("Session error: ", err);
      }
    }
    //1) Check on 1st render for a session (getSession())
    getInitialSession();
    //2) Listen for changes in auth state (.onAuthStateChange())
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event: ", event);
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
