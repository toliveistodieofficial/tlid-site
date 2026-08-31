const SUPABASE_URL =
    "https://ocqpzvibfjnbtbteuvik.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_1FspwG460ErdF3Mq30UrXg_sK0kilHu";

const AUTH_REDIRECT_URL =
    new URL(
        "auth-callback.html",
        window.location.href
    ).href;

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        }
    );