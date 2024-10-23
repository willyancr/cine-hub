"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NaviBarProps = {
  children: React.ReactNode;
  href: string;
};

export default function NaviBar({ children, href }: NaviBarProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl p-2 text-zinc-400 transition-all hover:text-zinc-50",
        isActive &&
          "rounded-xl bg-gradient-custom text-zinc-50 brightness-110 transition-all",
      )}
    >
      {children}
    </Link>
  );
}
