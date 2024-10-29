"use client";
import { IconSquareRoundedCheck } from "@tabler/icons-react";
import { MovieProps } from "@/app/types/movies-watchlist-ed";
import { CardWatched } from "./card-watched";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CardLogin from "@/app/components/card-login";

export default function Watched() {
  const [watcheds, setWatcheds] = useState<MovieProps[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    try {
      fetch("/api/get-watched")
        .then((res) => res.json())
        .then((data) => {
          setWatcheds(data.watched);
        });
    } catch (err) {
      console.error(
        "Não foi possivel retornar a lista de filmes/series na watched",
        err,
      );
    }
  }, []);
  console.log(watcheds);
  return (
    <main className="mb-40 max-h-screen w-full flex-grow p-6">
      <div className="mt-10 flex flex-col gap-12">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <IconSquareRoundedCheck
            stroke={1.5}
            size={32}
            className="text-primary"
          />
          Assistidos
        </h1>

        {session ? (
          <>
            <span className="w-full border-b">
              Você assitiu {watcheds?.length ? watcheds.length : "0"}{" "}
              filme/serie(s).
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {watcheds?.map((watched) => (
                <div key={watched.movieId}>
                  <CardWatched
                    movieId={watched.movieId}
                    url={watched.movie.poster_path}
                    title_movie={watched.movie.title}
                    title_serie={watched.movie.name}
                    vote_average={watched.movie.vote_average}
                    setWatcheds={setWatcheds}
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
