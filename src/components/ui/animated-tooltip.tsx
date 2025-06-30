"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TooltipItem } from "@/lib/types";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { TooltipType, useTooltip } from "@/providers/tooltip-provider";

export const AnimatedTooltip = ({
  position,
  items,
  flexDirectionClass,
}: {
  position: "top" | "right" | "bottom" | "left";
  items: TooltipItem[];
  flexDirectionClass: string;
}) => {
  const path = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string>("");

  const elements = useRef<(HTMLLIElement | null)[]>([]);

  const tooltip = useTooltip();

  useEffect(() => {
    const payload: TooltipType[] = [];
    items.forEach((item, i) => {
      payload.push({
        enabled: hoveredHref === item.href,
        name: item.name,
        top: elements.current[i]?.getBoundingClientRect().top || 0,
        left: elements.current[i]?.getBoundingClientRect().left || 0,
        position,
      });
    });
    tooltip.dispatch({
      type: "SET",
      payload,
    });
  }, []);

  useEffect(() => {
    const payload: TooltipType[] = [];
    items.forEach((item, i) => {
      payload.push({
        enabled: hoveredHref === item.href,
        name: item.name,
        top: elements.current[i]?.getBoundingClientRect().top || 0,
        left: elements.current[i]?.getBoundingClientRect().left || 0,
        position,
      });
    });
    tooltip.dispatch({
      type: "UPDATE",
      payload,
    });
  }, [hoveredHref]);

  return (
    <>
      <ul className={clsx("flex gap-8", flexDirectionClass)}>
        {items.map((item, i) => {
          return (
            <li
              className="group"
              key={item.name}
              onMouseEnter={() => setHoveredHref(item.href)}
              onMouseLeave={() => setHoveredHref("")}
              ref={(el) => {
                elements.current[i] = el;
              }}
            >
              <Link
                href={item.href}
                className={clsx(
                  "group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer",
                  {
                    "dark:bg-[#2F006B] bg-[#EEE0FF]": path === item.href,
                  }
                )}
              >
                <item.component selected={path === item.href} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
