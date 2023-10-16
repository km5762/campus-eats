import React, { createContext, useContext, useEffect, useState } from "react";
import {
  supabaseClient,
  supabaseKey,
  supabaseUrl,
} from "../services/supabaseClient";
import { useAuth } from "./AuthProvider";
import { onAuthStateChange } from "../hooks/useSupabaseSession";

export interface UserVotesStore {
  [key: number]: boolean | null;
}

interface UserVotesStoreContext {
  userVotesStore: UserVotesStore;
  addVote: (reviewID: number, value: boolean | null) => void;
}

const UserVotesStoreContext = createContext<UserVotesStoreContext | undefined>(
  undefined
);

export const useUserVotesStore = () => {
  const context = useContext(UserVotesStoreContext);
  if (!context) {
    throw new Error(
      "useUserVotesContext must be used within a UserVotesProvider"
    );
  }
  return context;
};

export default function UserVotesStoreProvider({
  children,
}: {
  children: any;
}) {
  const [userVotesStore, setUserVotesStore] = useState<UserVotesStore>({});
  const jwt = useAuth()?.access_token;

  function addVote(reviewID: number, value: boolean | null) {
    setUserVotesStore((prevVotes) => ({ ...prevVotes, [reviewID]: value }));
    console.log({ ...userVotesStore, [reviewID]: value });
  }

  function syncVotes() {
    const reviewIDs = Object.keys(userVotesStore);
    if (reviewIDs.length > 0) {
      const sqlRepresentation = [];

      for (const [review_id, value] of Object.entries(userVotesStore)) {
        sqlRepresentation.push({ review_id, value });
      }

      fetch(`${supabaseUrl}/rest/v1/rpc/upsert_votes`, {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
          apikey: supabaseKey,
        },
        body: JSON.stringify({ p_votes: sqlRepresentation }),
      });
      clearVotes();
    }
  }

  function clearVotes() {
    setUserVotesStore({});
  }

  useEffect(() => {
    window.addEventListener("pagehide", syncVotes);
    const {
      data: { subscription },
    } = onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        syncVotes();
        clearVotes();
      }
    });

    return () => {
      window.removeEventListener("pagehide", syncVotes);
      subscription.unsubscribe();
    };
  }, [userVotesStore]);

  return (
    <UserVotesStoreContext.Provider value={{ userVotesStore, addVote }}>
      {children}
    </UserVotesStoreContext.Provider>
  );
}
