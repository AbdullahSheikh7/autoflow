"use client";

import { clsx } from "clsx";
import Link from "next/link";

type Props = {
  href: string;
  title: string;
  variant?: string;
};

const Button = ({ href, title, variant = "solid" }: Props) => {
  console.log(variant);
  return (
    <span
      className={clsx({
        "px-6 py-3 text-sm rounded-full border": true,
        "border-[#6D63FB] bg-[linear-gradient(#1C166E,#020208)]":
          variant === "solid",
        "border-white bg-transparent": variant === "outline",
      })}
    >
      <Link href={href}>{title}</Link>
    </span>
  );
};

export default Button;
