'use client'
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function InputSearch({ placeholder }: { placeholder: string }) {
  const [data, setData] = useState<string>("");
  return (
    <div className="space-y-2">
      <div className="relative w-50">
        <Input
          id="input-26"
          className="peer rounded-xl pe-9 ps-9"
          placeholder={placeholder}
          type="search"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <Link href={`/search/${data}`}>
          <button
            className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="submit"
          >
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </Link>
      </div>
    </div>
  );
}
