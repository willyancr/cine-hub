"use client";

import { MovieProps } from "@/app/types/movies-watchlist-ed";
import { Button } from "@/components/ui/button";
import { IconStar } from "@tabler/icons-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type Props = {
  movieId: number;
  url: string;
  title_movie: string;
  title_serie: string;
  vote_average: number;
  setWatchlists: (watchlists: MovieProps[]) => void;
};
export function CardWatchlist({
  movieId,
  url,
  title_movie,
  title_serie,
  vote_average,
  setWatchlists,
}: Props) {
  const { data: session } = useSession();

  const deleteMovie = (movieId: number) => {
    const removeMovie = async () => {
      if (!session?.user?.id) {
        console.error("Usuário não autenticado");
        return;
      }
      try {
        const deleteResponse = await fetch(`/api/delete-watchlist`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            movieId: movieId.toString(),
            userId: session?.user.id,
          }),
        });

        if (!deleteResponse.ok) {
          throw new Error("Erro ao deletar da watchlist");
        }
        toast.success(
          `${title_movie ? title_movie : title_serie} removido com sucesso`,
        );

        // Busca a lista atualizada da watchlist
        const fetchResponse = await fetch("/api/get-watchlist");
        const data = await fetchResponse.json();

        // Atualiza o estado local com a lista atualizada
        setWatchlists(data.watchlist);
      } catch (error) {
        console.error("Não foi possível deletar da watchlist", error);
        toast.error("Não foi possível deletar da watchlist, tente mais tarde");
      }
    };

    removeMovie(); // Chama a função assíncrona
  };
  const moveToWatched = (movieId: number) => {
    const moveMovie = async () => {
      if (!session?.user?.id) {
        console.error("Usuário não autenticado");
        return;
      }
      try {
        const moveResponse = await fetch(`/api/move-to-watched`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify({
            movieId: movieId.toString(),
            userId: session?.user.id,
          }),
        });

        if (!moveResponse.ok) {
          throw new Error("Erro ao mover para assistidos");
        }
        toast.success(
          `${title_movie ? title_movie : title_serie} movido para assistidos`,
        );

        // Busca a lista atualizada da watchlist
        const fetchResponse = await fetch("/api/get-watchlist");
        const data = await fetchResponse.json();

        // Atualiza o estado local com a lista atualizada
        setWatchlists(data.watchlist);
      } catch (error) {
        console.error("Não foi possível deletar da watchlist", error);
      }
    };

    moveMovie(); // Chama a função assíncrona
  };

  return (
    <div className="group/card w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_IMG}${url})`,
        }}
        className="card relative mx-auto flex h-60 w-full max-w-[350px] flex-col justify-between overflow-hidden rounded-xl bg-cover p-4 shadow-xl sm:h-64 sm:max-w-[400px] md:h-72 xl:h-80 xl:max-w-[450px]"
      >
        <div className="absolute left-0 top-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>
        <div className="absolute right-2 top-1 flex items-center gap-1 rounded-xl bg-secondary/40 px-2 py-1 text-xs">
          {vote_average.toFixed(1)}
          <IconStar stroke={1.5} size={12} className="text-primary" />
        </div>
        <div className="group relative mt-auto">
          <Link
            href={
              title_movie.length
                ? `/detalhes-filme/${movieId}`
                : `/detalhes-serie/${movieId}`
            }
          >
            <h1 className="relative z-10 text-xl font-bold text-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-2xl md:text-3xl">
              {title_movie ? title_movie : title_serie}
            </h1>
          </Link>
          <div className="my-4 flex flex-col gap-2 text-sm font-normal text-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex-row sm:text-base md:text-lg">
            <Button
              onClick={() => moveToWatched(movieId)}
              className="rounded-xl bg-gradient-custom text-white hover:brightness-110"
            >
              Assistido!
            </Button>
            <Button
              onClick={() => deleteMovie(movieId)}
              variant="destructive"
              className="rounded-xl"
            >
              Remover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
