import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://iwptfjsevnbdstlwjyll.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cHRmanNldm5iZHN0bHdqeWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNDM5ODEsImV4cCI6MjAyNDYxOTk4MX0.Wmv-v_Aaf_JSu-SlmM-aVNjc0DkM7S_-9u5TwgtaFtQ'

export const supabase = createClient(supabaseUrl!, supabaseKey!);