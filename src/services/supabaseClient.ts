import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByYWF1bm50cmFxendvbWlrbGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1NDAzODMsImV4cCI6MjAwMDExNjM4M30.iy7rGNKGQ5HeK0xJhKN3OzXqbNnegkVVAic7rWZ-iXU";
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
