export const SUPABASE_URL = "https://kxbqomahpuqhhfsmbeir.supabase.co";
export const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YnFvbWFocHVxaGhmc21iZWlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTMwNDEsImV4cCI6MjA5NTU4OTA0MX0.fZUZpeWEmDkE_tbsxxf9wri2nXWRoHKjAKW69ae5tjo";

export const BASE_URL = `${SUPABASE_URL}/rest/v1/mascotas`;

export const headers = {
  apikey: SUPABASE_API_KEY,
  Authorization: `Bearer ${SUPABASE_API_KEY}`,
  "Content-Type": "application/json",
};