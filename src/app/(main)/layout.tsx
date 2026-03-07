import Infobar from "@/components/infobar";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full flex-1 flex flex-col">
        <Infobar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
