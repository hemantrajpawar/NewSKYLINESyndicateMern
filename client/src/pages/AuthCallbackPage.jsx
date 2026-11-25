import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
export default function AuthCallbackPage() {
  const [params] = useSearchParams();
  useEffect(() => {
    const token = params.get("token");
    const returnTo = params.get("returnTo") || "/";
    if (token) {
      base44.auth.setToken(token);
      window.location.replace(returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/");
    } else {
      window.location.replace("/login?error=google_auth_failed");
    }
  }, [params]);
  return <div className="container-x py-32 text-center font-body text-sm">Completing sign-in…</div>;
}
