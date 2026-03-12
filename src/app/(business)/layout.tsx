import Navbar from "@/components/global/navbar";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="pt-20 bg-[#020208]">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
