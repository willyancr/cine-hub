"use client";
import { IconUserPlus } from "@tabler/icons-react";
import { CardWatchlist } from "./card-watchlist";
import { useEffect, useState } from "react";

type MovieProps = {
  movieId: number;
  movie: {
    title: string;
    name: string;
    poster_path: string;
    vote_average: number;
  };
};
export default function Watchlist() {
  const [watchlists, setWatchlists] = useState<MovieProps[]>([]);

  useEffect(() => {
    try {
      fetch("/api/get-watchlist")
        .then((res) => res.json())
        .then((data) => {
          setWatchlists(data.watchlist);
        });
    } catch (err) {
      console.error(
        "Não foi possivel retornar a lista de filmes/series na watchlist",
        err,
      );
    }
  }, []);
  console.log(watchlists);
  return (
    <main className="mb-40 max-h-screen w-full flex-grow p-6">
      <div className="mt-10 flex flex-col gap-12">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <IconUserPlus stroke={1.5} size={32} className="text-primary" />
          Watchlist
        </h1>

        <span className="w-full border-b">
          Você tem {watchlists.length ? watchlists.length : 0} filme/serie(s) na
          sua lista.
        </span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {watchlists.map((watchlist) => (
            <div key={watchlist.movieId}>
              <CardWatchlist
                movieId={watchlist.movieId}
                url={watchlist.movie.poster_path}
                title_movie={watchlist.movie.title}
                title_serie={watchlist.movie.name}
                vote_average={watchlist.movie.vote_average}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
