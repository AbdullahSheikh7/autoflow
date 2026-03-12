"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "./button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [underlineLeft, setUnderlineLeft] = useState<number>(0);
  const [underlineWidth, setUnderlineWidth] = useState<number>(0);

  const path = usePathname();

  const [menu, setMenu] = useState([
    { title: "Home", url: "/" },
    { title: "Privacy Policy", url: "/privacy-policy" },
    { title: "Terms of Service", url: "/terms-of-service" },
  ]);

  const activeEl = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const width = activeEl.current!.offsetWidth;
    const left = activeEl.current!.offsetLeft;
    setUnderlineLeft(left + width / 8);
    setUnderlineWidth((width * 3) / 4);
  }, [path]);

  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 z-100 flex items-center justify-between">
      <aside className="flex items-center gap-0.5 font-bold text-3xl">
        <p>Auto</p>
        <Image
          src="/fuzzieLogo.png"
          width={15}
          height={15}
          alt="fuzzie logo"
          className="shadow-sm"
        />
        <p>low.</p>
      </aside>

      <nav className="relative text-sm bg-[#020208] rounded-full border border-white hidden md:block py-3 px-6 overflow-hidden">
        <div
          className="absolute top-3/4 flex items-center justify-center flex-col transition-[left,width]"
          style={{
            width: underlineWidth + "px",
            left: underlineLeft + "px",
          }}
        >
          <div className="w-1/4 h-1 bg-white blur-sm z-1" />
          <div className="w-full h-0.5 bg-white" />
          <div className="w-full h-4 bg-black z-2" />
        </div>
        <ul className="flex items-center gap-8 list-none">
          {menu.map((menu) => {
            const isActive: boolean = path === menu.url;
            return (
              <li key={menu.url} ref={isActive ? activeEl : null}>
                <Link href={menu.url}>{menu.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <aside className="flex items-center gap-4">
        <Button href="/sign-in" title="Login" />
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  );
};

export default Navbar;
