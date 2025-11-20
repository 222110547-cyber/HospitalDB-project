console.log("supabase.js loaded");

const SUPABASE_URL = "https://tbmwpsyfugkhrqziakex.supabase.co";
const SUPABASE_KEY = "sb_publishable_SN_U6nzXEjkz8bg78FNlAA_5TV5iQLc";

window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase client initialized");
