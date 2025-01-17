"use client";

import { MovieProps } from "@/app/types/movies-watchlist-ed";
import { IconHourglassHigh } from "@tabler/icons-react";
import CardLogin from "@/app/components/card-login";
import { CardWatchlist } from "./card-watchlist";
import Loading from "@/app/components/loading";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Watchlist() {
  const [watchlists, setWatchlists] = useState<MovieProps[]>([]);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const res = await fetch("/api/get-watchlist");
        const data = await res.json();
        setWatchlists(data.watchlist);
      } catch (err) {
        console.error(
          "Não foi possivel retornar a lista de filmes/series na watchlist",
          err,
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <main className="mb-10 w-full flex-grow p-6">
      <div className="mt-10 flex flex-col gap-12">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold sm:justify-start">
          <IconHourglassHigh stroke={1.5} size={32} className="text-primary" />
          Quero Assitir
        </h1>
        {session ? (
          <>
            <span className="w-full border-b">
              Você tem {watchlists.length ? watchlists.length : 0}{" "}
              filme/serie(s) na sua lista.
            </span>

            {isLoading && <Loading />}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {watchlists.slice().reverse().map((watchlist) => (
                <div key={watchlist.movieId}>
                  <CardWatchlist
                    movieId={watchlist.movieId}
                    url={watchlist.movie.poster_path}
                    title_movie={watchlist.movie.title}
                    title_serie={watchlist.movie.name}
                    vote_average={watchlist.movie.vote_average}
                    setWatchlists={setWatchlists}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <CardLogin />
        )}
      </div>
    </main>
  );
}
