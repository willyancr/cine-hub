import { IconStar } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  movieId: number;
  url: string;
  title_movie: string;
  title_serie: string;
  vote_average: number;
};
export function CardWatched({
  movieId,
  url,
  title_movie,
  title_serie,
  vote_average,
}: Props) {
  return (
    <div className="group/card w-full max-w-xs sm:max-w-sm md:max-w-md">
      <Link
        href={
          title_movie.length
            ? `/detalhes-filme/${movieId}`
            : `/detalhes-serie/${movieId}`
        }
      >
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_IMG}${url})`,
          }}
          className="card group relative mx-auto flex h-60 w-full max-w-[350px] flex-col justify-between overflow-hidden rounded-xl bg-cover p-4 shadow-xl sm:h-64 sm:max-w-[400px] md:h-72 xl:h-80 xl:max-w-[450px]"
        >
          <div className="absolute left-0 top-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>
          <div className="absolute right-2 top-1 flex items-center gap-1 rounded-xl bg-secondary/40 px-2 py-1 text-xs">
            {vote_average.toFixed(1)}
            <IconStar stroke={1.5} size={12} className="text-primary" />
          </div>
          <div className="relative mt-auto">
            <h1 className="relative z-10 text-xl font-bold text-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-2xl md:text-3xl">
              {title_movie ? title_movie : title_serie}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}
