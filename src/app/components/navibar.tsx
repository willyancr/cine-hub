import { cn } from "@/lib/utils";
import Link from "next/link";

type NaviBarProps = {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
};

export default function NaviBar({ children, href, isActive }: NaviBarProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 text-zinc-400 transition-all hover:text-zinc-50",
        isActive && "border-l-4 border-l-blue-400 text-zinc-50",
      )}
    >
      {children}
    </Link>
  );
}
