
import { useState } from "react";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { toast } from "sonner";

import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

export default function AccountSecurityPage() {
  const { user, refresh } = useAuth();

  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [action, setAction] = useState("");
  const [step, setStep] = useState("idle");
  const [busy, setBusy] = useState(false);

  async function startChange(event) {
    event.preventDefault();
    setBusy(true);

    try {
      await base44.auth.startMfaChange(action, password);
      setStep("verify");
      toast.success("Verification code sent to your email");
    } catch (error) {
      toast.error(error.message || "Could not start security change");
    } finally {
      setBusy(false);
    }
  }

  async function confirmChange(event) {
    event.preventDefault();
    setBusy(true);

    try {
      await base44.auth.confirmMfaChange(action, otpCode);
      await refresh();

      setStep("idle");
      setPassword("");
      setOtpCode("");
      setAction("");

      toast.success("Security settings updated");
    } catch (error) {
      toast.error(error.message || "Verification failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      icon={ShieldCheck}
      title="Account security"
      subtitle="Manage your sign-in verification"
    >
      <div className="space-y-5">
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Email two-factor authentication</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {user?.mfaEnabled
                  ? "Enabled — a code is required during login."
                  : "Disabled — login uses your password only."}
              </p>
            </div>

            {user?.mfaEnabled ? (
              <ShieldCheck className="h-6 w-6 text-green-600" />
            ) : (
              <ShieldOff className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        </div>

        {step === "idle" && (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              setAction(user?.mfaEnabled ? "disable" : "enable");
              startChange(event);
            }}
          >
            <label className="block text-sm font-medium">
              Confirm your current password
            </label>

            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <Button type="submit" disabled={busy || !password} className="w-full">
              {busy
                ? "Please wait..."
                : user?.mfaEnabled
                  ? "Disable email MFA"
                  : "Enable email MFA"}
            </Button>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={confirmChange} className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Enter the six-digit confirmation code sent to your registered email.
            </p>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otpCode}
                onChange={setOtpCode}
                autoComplete="one-time-code"
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              disabled={busy || otpCode.length !== 6}
              className="w-full"
            >
              {busy ? "Verifying..." : "Confirm security change"}
            </Button>

            <button
              type="button"
              className="w-full text-sm text-primary hover:underline"
              onClick={() => {
                setStep("idle");
                setOtpCode("");
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
