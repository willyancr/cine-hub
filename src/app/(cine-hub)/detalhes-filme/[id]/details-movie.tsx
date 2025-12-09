"use client";

import {
  IconBrandZapier,
  IconInfoSquareRounded,
  IconStar,
} from "@tabler/icons-react";
import { convertRuntime, formatCurrency } from "@/app/utils/conversion";
import { useStore } from "@/app/store/useMovieListsStore";
import ReviewSection from "@/app/components/card-review";
import { MovieDetails } from "@/app/types/movie-details";
import CardTrailer from "@/app/components/card-trailer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/axios";
import Image from "next/image";
import MoreAt from "@/app/components/more-at";
import { useSession } from "next-auth/react";

export default function DetailsMovie({ params }: { params: { id: string } }) {
  const id = params.id;
  const {
    addToWatchlist,
    addToWatched,
    isInWatchlist,
    isInWatched,
    fetchWatchlist,
    fetchWatched,
    watchlists,
    watcheds,
  } = useStore();
  const [isActiveWatchlist, setIsActiveWatchlist] = useState(false);
  const [isActiveWatched, setIsActiveWatched] = useState(false);
  const [detailsMovies, setDetailsMovies] = useState<MovieDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingWatched, setIsLoadingWatched] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      fetchWatchlist();
      fetchWatched();
    }
  }, [session, fetchWatchlist, fetchWatched]);

  useEffect(() => {
    if (id) {
      setIsActiveWatchlist(isInWatchlist(id));
      setIsActiveWatched(isInWatched(id));
    }
  }, [id, isInWatchlist, isInWatched, watchlists, watcheds]);

  useEffect(() => {
    api.get(`/movie/${id}`).then((response) => {
      setDetailsMovies(response.data);
    });
  }, [id, setDetailsMovies]);

  const handleAddToWatchlist = async () => {
    setIsLoading(true);

    if (session && session?.user && detailsMovies) {
      try {
        await addToWatchlist({
          userId: session?.user?.id || "",
          movieId: detailsMovies?.id.toString(),
          title: detailsMovies?.title || "",
          name: detailsMovies?.name || "",
          poster_path: detailsMovies?.poster_path,
          vote_average: detailsMovies?.vote_average,
        });
        setIsActiveWatchlist(true);
      } catch (error) {
        console.error("Erro ao adicionar à watchlist:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleAddToWatched = async () => {
    setIsLoadingWatched(true);

    if (session && session?.user && detailsMovies) {
      try {
        await addToWatched({
          userId: session?.user?.id || "",
          movieId: detailsMovies?.id.toString(),
          title: detailsMovies?.title || "",
          name: detailsMovies?.name || "",
          poster_path: detailsMovies?.poster_path,
          vote_average: detailsMovies?.vote_average,
        });
        setIsActiveWatched(true);
      } catch (error) {
        console.error("Erro ao adicionar à watched:", error);
      } finally {
        setIsLoadingWatched(false);
      }
    }
  };

  return (
    <main className="mb-40 max-h-screen w-full flex-grow p-6">
      <div className="mt-10 flex flex-col gap-4">
        <h1 className="flex items-center justify-center sm:justify-start gap-2 text-3xl font-bold">
          Detalhes do Filme
          <IconInfoSquareRounded
            stroke={1.5}
            size={32}
            className="text-primary"
          />
        </h1>
        <Card className="my-12 w-full max-w-4xl overflow-hidden text-white">
          <div className="flex flex-col md:flex-row">
            {/* Left column */}
            <div className="flex flex-col items-center justify-center p-6 md:w-1/2">
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMG}${detailsMovies?.poster_path}`}
                alt="Capa do filme"
                width={500}
                height={500}
                quality={100}
                className="max-h-[450px] w-full rounded-xl shadow-xl"
              />
            </div>

            {/* Divider */}
            <div className="mx-4 hidden w-px bg-primary/20 md:block"></div>

            {/* Right column */}
            <div className="flex flex-col justify-between gap-4 p-6 md:w-1/2">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {detailsMovies?.title}{" "}
                    <span className="text-zinc-300">
                      ({detailsMovies?.release_date.substring(0, 4)})
                    </span>
                  </h2>
                  <Badge className="flex w-fit items-center gap-1 rounded-xl border-none bg-gradient-custom py-1 text-white">
                    {detailsMovies?.vote_average.toFixed(1)}
                    <IconStar stroke={2} size={12} className="text-white" />
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-zinc-400">
                    {detailsMovies?.genres
                      .map((genre) => genre.name)
                      .join(" • ")}
                  </span>
                  <span className="text-sm text-zinc-400">
                    - {convertRuntime(detailsMovies?.runtime ?? 0)}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Sinopse</h3>
                <p className="text-sm text-zinc-400">
                  {detailsMovies?.overview}
                </p>
              </div>
              <div className="flex items-center justify-between gap-1 text-sm">
                <div className="flex flex-col">
                  <span className="font-semibold">Titulo Original</span>
                  <span className="text-zinc-300">
                    {detailsMovies?.original_title}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Idioma Original</span>
                  <span className="uppercase text-zinc-300">
                    {detailsMovies?.original_language}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Orçamento</span>
                  <span className="text-zinc-300">
                    {formatCurrency(detailsMovies?.budget ?? 0)}
                  </span>
                </div>
              </div>

              <MoreAt
                title={detailsMovies?.title || detailsMovies?.name || ""}
              />
              
              <div className="mt-6 flex w-full flex-col items-center justify-between gap-4 lg:flex-row lg:gap-1">
                {isLoading ? (
                  <Button
                    disabled
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-custom text-white transition-all hover:brightness-110"
                  >
                    <IconBrandZapier size={16} className="animate-spin" />
                    Marcando...
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddToWatchlist}
                    disabled={isActiveWatchlist || isActiveWatched || !session}
                    className="w-full rounded-xl bg-gradient-custom text-white transition-all hover:brightness-110"
                  >
                    {isActiveWatchlist
                      ? "Adicionado à Lista"
                      : "Marcar para Assistir"}
                  </Button>
                )}
                {isLoadingWatched ? (
                  <Button
                    disabled
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-custom text-white transition-all hover:brightness-110"
                  >
                    <IconBrandZapier size={16} className="animate-spin" />
                    Marcando...
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddToWatched}
                    disabled={isActiveWatched || !session}
                    className="w-full rounded-xl bg-gradient-custom text-white transition-all hover:brightness-110"
                  >
                    {isActiveWatched ? "Já Assistido" : "Marcar como Assistido"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Trailer */}
        <CardTrailer id={id} trailerType={"movie"} />

        {/* Reviews */}
        <ReviewSection id={id} review={"movie"} />
      </div>
    </main>
  );
}
