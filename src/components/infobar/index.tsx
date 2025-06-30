"use client";

import { Book, Headphones, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { TooltipItem } from "@/lib/types";

const infobarOptions: TooltipItem[] = [
  { name: "Contact Support", component: Headphones, href: "/support" },
  { name: "Guide", component: Book, href: "/guide" },
];

const Infobar = () => {
  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
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
