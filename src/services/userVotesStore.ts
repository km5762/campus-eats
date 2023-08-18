import { VoteData } from "../components/ReviewCard";
import { batchVotes } from "./api";
import { supabaseUrl, supabaseKey, supabaseClient } from "./supabaseClient";

export interface UserVotesStore {
  [key: number]: boolean;
}

export const userVotesStore: UserVotesStore = {};
let jwt: string | undefined;

export function setJWT(setTo: string | undefined) {
  jwt = setTo;
}

export function addVote(reviewID: number, value: boolean) {
  userVotesStore[reviewID] = value;
  console.log(userVotesStore);
}

function syncVotes() {
  const reviewIDs = Object.keys(userVotesStore);
  if (reviewIDs.length > 0) {
    const sqlRepresentation = [];

    for (const [review_id, value] of Object.entries(userVotesStore)) {
      sqlRepresentation.push({ review_id, value });
    }

    fetch(`${supabaseUrl}/rest/v1/vote`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
        apikey: supabaseKey,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(sqlRepresentation),
    });
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", syncVotes);
}

supabaseClient.auth.onAuthStateChange((event) => {
  if (event == "SIGNED_OUT") {
    syncVotes();
  }
});
