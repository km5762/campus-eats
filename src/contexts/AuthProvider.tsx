import React, { createContext, useContext } from "react";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import { Session } from "@supabase/supabase-js";

type SessionStatus = Session | null | undefined;

const AuthContext = createContext<SessionStatus>(undefined);

export default function AuthProvider({ children }: any) {
  const session = useSupabaseSession();

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
