"use client";

import { Book, Headphones, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { TooltipItem } from "@/lib/types";
import { useBilling } from "@/providers/billing-provider";
import { onPaymentDetails } from "@/app/(main)/(pages)/billing/_actions/payment-connections";
import { useEffect } from "react";

const infobarOptions: TooltipItem[] = [
  { name: "Contact Support", component: Headphones, href: "/support" },
  { name: "Guide", component: Book, href: "/guide" },
];

const Infobar = () => {
  const { credits, setCredits, tier, setTier } = useBilling();

  const onGetPayment = async () => {
    const response = await onPaymentDetails();

    if (response) {
      setCredits(response.credits!);
      setTier(response.tier!);
    }
  };

  useEffect(() => {
    onGetPayment();
  }, []);

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-gray-300">Credits</p>
        {tier === "Unlimited" ? (
          <span>Unlimited</span>
        ) : (
          <span>
            {credits}/{tier === "Free" ? "10" : tier === "Pro" && "100"}
          </span>
        )}
      </span>
      <span className="flex items-center bg-muted px-4 rounded-full">
        <Search />
        <Input
          placeholder="Quick search"
          className="border-none bg-transparent"
        />
      </span>
      <AnimatedTooltip
        position="bottom"
        flexDirectionClass="flex-row"
        items={infobarOptions}
      />
    </div>
  );
};

export default Infobar;
