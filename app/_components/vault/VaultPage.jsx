"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { VaultView } from "./VaultView";

export default function VaultPage({ vaultId }) {
  const [otp, setOtp] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const unlockVaultMutation = useMutation({
    mutationFn: async (otp) => {
      const res = await axios.post(`/api/vaults/${vaultId}/unlock`, {
        password: otp,
      });
      if (res.data.status !== "success") {
        throw new Error(res.data.message || "Incorrect password");
      }
      return res.data.data;
    },
    onSuccess: (data) => {
      setIsUnlocked(true);
      toast.success("Vault Unlocked");
    },
    onError: (err) => {
      toast.error("Invalid Password");

      setOtp(""); // clear OTP field
    },
    retry: false, // ❗ Prevent automatic retry
  });

  useEffect(() => {
    if (otp.length >= 6 && !isUnlocked && !unlockVaultMutation.isPending) {
      unlockVaultMutation.mutate(otp);
    }
  }, [otp]);

  useEffect(() => {
    if (!vaultId) notFound();
  }, [vaultId]);

  if (unlockVaultMutation.isPending) {
    return <div className="text-center mt-10">Unlocking vault...</div>;
  }

  if (isUnlocked && unlockVaultMutation.data) {
    return (
      <div className="md:px-6 px-4">
        <VaultView vaultData={unlockVaultMutation.data} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-card border rounded-2xl p-6 shadow-lg">
        <h1 className="text-xl font-bold text-center mb-6">
          Unlock Your Vault
        </h1>

        <p className="text-muted-foreground text-center mb-4">
          Enter your 6-digit PIN to unlock the vault.
        </p>
        <div className="flex items-center justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            disabled={unlockVaultMutation.isPending}
            className="flex justify-center"
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-12 h-14 text-xl font-medium rounded-lg border bg-muted text-center focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {unlockVaultMutation.isError && (
          <p className="text-destructive text-sm text-center mt-4">
            Invalid password. Please try again.
          </p>
        )}

        {unlockVaultMutation.isPending && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            Unlocking vault...
          </p>
        )}
      </div>
    </div>
  );
}
