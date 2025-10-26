"use client";

import { useState } from "react";
import { DaimoPayTransferButton } from "~/components/daimo-pay-transfer-button";
import { Card } from "~/components/ui/card";

const RECIPIENT_ADDRESS = "0x8F69c8eB92Ed068Aa577cE1847D568B39b0d9EBF" as const;
const PRESET_AMOUNTS = [10, 25, 50, 100] as const;

export function DonationApp() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handlePaymentCompleted = (amount: number) => {
    setSelectedAmount(amount);
    setShowThankYou(true);
    // Reset thank you message after 5 seconds
    setTimeout(() => {
      setShowThankYou(false);
      setSelectedAmount(null);
    }, 5000);
  };

  if (showThankYou) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        <Card className="p-8 text-center space-y-4 bg-green-50 border-green-200">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-semibold text-green-800">
            Thank you for your donation!
          </h2>
          <p className="text-lg text-green-700">
            Your ${selectedAmount} USDC donation has been sent successfully.
          </p>
          <p className="text-sm text-green-600">
            Your support means everything to our community.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold">Support Our Community</h1>
        <p className="text-muted-foreground">
          Help keep our community thriving with a USDC donation
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Donation Address
          </h3>
          <div className="font-mono text-xs bg-muted p-3 rounded break-all">
            {RECIPIENT_ADDRESS}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-center">Choose Amount (USDC)</h3>
        <div className="grid grid-cols-2 gap-3">
          {PRESET_AMOUNTS.map((amount) => (
            <DaimoPayTransferButton
              key={amount}
              text={`$${amount} USDC`}
              toAddress={RECIPIENT_ADDRESS}
              amount={amount.toString()}
              onPaymentCompleted={() => handlePaymentCompleted(amount)}
            />
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Payments are processed securely on Base network
      </div>
    </div>
  );
}