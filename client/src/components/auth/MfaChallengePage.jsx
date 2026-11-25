
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import { base44 } from "@/api/base44Client";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthError, SubmitButton } from "@/components/auth/parts";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function MfaChallengePage() {
  const navigate = useNavigate();

  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");

    const challengeToken = sessionStorage.getItem("skyline_mfa_challenge");

    if (!challengeToken) {
      setError("Your login session expired. Please log in again.");
      return;
    }

    setBusy(true);

    try {
      await base44.auth.verifyMfa(challengeToken, otpCode);

      const returnTo =
        sessionStorage.getItem("skyline_mfa_return_to") || "/";

      sessionStorage.removeItem("skyline_mfa_challenge");
      sessionStorage.removeItem("skyline_mfa_return_to");

      navigate(
        returnTo.startsWith("/") && !returnTo.startsWith("//")
          ? returnTo
          : "/",
        { replace: true }
      );
    } catch (err) {
      setError(err.message || "Verification failed");
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      icon={ShieldCheck}
      title="Verify your identity"
      subtitle="Enter the six-digit code sent to your registered email"
    >
      <AuthError>{error}</AuthError>

      <form onSubmit={submit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otpCode}
            onChange={setOtpCode}
            autoFocus
            autoComplete="one-time-code"
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <SubmitButton
          busy={busy}
          busyLabel="Verifying..."
          disabled={busy || otpCode.length !== 6}
        >
          Verify and sign in
        </SubmitButton>
      </form>

      <button
        type="button"
        className="mt-5 w-full text-center text-sm text-primary hover:underline"
        onClick={() => {
          sessionStorage.removeItem("skyline_mfa_challenge");
          sessionStorage.removeItem("skyline_mfa_return_to");
          window.location.href = "/login";
        }}
      >
        Back to login
      </button>
    </AuthLayout>
  );
}
