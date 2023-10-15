import { useState, useEffect } from "react";
import { supabaseClient } from "../services/supabaseClient";
import {
  AuthChangeEvent,
  Session,
  Subscription,
  User,
} from "@supabase/supabase-js";

export const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return session;
};

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
) {
  let currentSession: Session | null;
  return supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session?.user?.id == currentSession?.user?.id) return;
    currentSession = session;
    callback(event, session);
  });
}
