import { createBrowserClient } from "@supabase/ssr";

// Always returns the same singleton — never call createBrowserClient inside
// event handlers or useEffect deps, as this would create competing instances
// that break PKCE code-verifier cookie state.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { isSingleton: true }
  );
}
