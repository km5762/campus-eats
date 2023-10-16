// import { VoteData } from "../components/ReviewCard";
// import { onAuthStateChange } from "../hooks/useSupabaseSession";
// import { supabaseUrl, supabaseKey, supabaseClient } from "./supabaseClient";

// export interface UserVotesStore {
//   [key: number]: boolean | null;
// }

// export const userVotesStore: UserVotesStore = {};
// let jwt: string | undefined;

// export function setJWT(setTo: string | undefined) {
//   jwt = setTo;
// }

// export function addVote(reviewID: number, value: boolean | null) {
//   userVotesStore[reviewID] = value;
//   console.log(userVotesStore);
// }

// function syncVotes() {
//   const reviewIDs = Object.keys(userVotesStore);
//   if (reviewIDs.length > 0) {
//     const sqlRepresentation = [];

//     for (const [review_id, value] of Object.entries(userVotesStore)) {
//       sqlRepresentation.push({ review_id, value });
//     }

//     fetch(`${supabaseUrl}/rest/v1/rpc/upsert_votes`, {
//       method: "POST",
//       keepalive: true,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${jwt}`,
//         apikey: supabaseKey,
//       },
//       body: JSON.stringify({ p_votes: sqlRepresentation }),
//     });
//   }
// }

// if (typeof window !== "undefined") {
//   window.addEventListener("pagehide", syncVotes);
// }

// onAuthStateChange((event) => {
//   if (event == "SIGNED_OUT") {
//     syncVotes();
//   }
// });
