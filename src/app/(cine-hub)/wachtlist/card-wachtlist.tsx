"use client";

import { Button } from "@/components/ui/button";
import { IconStar } from "@tabler/icons-react";

type Props = {
  url: string;
  title: string;
};
export function CardWachtlist({ url, title }: Props) {
  return (
    <div className="group/card w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div
        style={{ backgroundImage: `url(${url})` }}
        className="card relative mx-auto flex h-60 w-full max-w-[350px] cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-cover p-4 shadow-xl sm:h-64 sm:max-w-[400px] md:h-72 xl:h-80 xl:max-w-[450px]"
      >
        <div className="absolute left-0 top-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>
        <div className="absolute right-2 top-1 flex items-center gap-1 rounded-xl bg-secondary/40 px-2 py-1 text-xs">
          8.5
          <IconStar stroke={1.5} size={12} className="text-primary" />
        </div>
        <div className="group relative mt-auto">
          <h1 className="relative z-10 text-xl font-bold text-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-2xl md:text-3xl">
            {title}
          </h1>

          <div className="my-4 flex flex-col gap-2 text-sm font-normal text-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex-row sm:text-base md:text-lg">
            <Button className="rounded-xl bg-gradient-custom text-white hover:brightness-110">
              Assistido!
            </Button>
            <Button variant="destructive" className="rounded-xl">
              Remover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
