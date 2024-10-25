"use client";

import { IconStar } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  id: number;
  poster: string;
  title_movie: string;
  name_serie: string;
  vote_average: number;
  media_type: string;
};
export function CardSearch({
  poster,
  title_movie,
  name_serie,
  vote_average,
  id,
  media_type,
}: Props) {
  return (
    <div className="group/card w-full max-w-xs sm:max-w-sm md:max-w-md">
      <Link
        href={
          media_type === "movie"
            ? `/detalhes-filme/${id}`
            : `/detalhes-serie/${id}`
        }
      >
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_IMG}${poster})`,
          }}
          className="card relative mx-auto flex h-60 w-full max-w-[350px] flex-col justify-between overflow-hidden rounded-xl bg-cover p-4 shadow-xl sm:h-64 sm:max-w-[400px] md:h-72 xl:h-80 xl:max-w-[450px]"
        >
          <div className="absolute left-0 top-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>
          <div className="absolute right-2 top-1 flex items-center gap-1 rounded-xl bg-secondary/40 px-2 py-1 text-xs">
            {vote_average.toFixed(1)}
            <IconStar stroke={1.5} size={12} className="text-primary" />
          </div>
          <div className="group relative mt-auto">
            <h1 className="relative z-10 text-xl font-bold text-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-2xl md:text-3xl">
              {title_movie ? title_movie : name_serie}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}
