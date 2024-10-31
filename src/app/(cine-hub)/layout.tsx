"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import SideBar from "../components/sidebar";
import MobileSideBar from "../components/mobile-sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster />
      <SideBar />
      <MobileSideBar />
      {children}
    </SessionProvider>
  );
}
