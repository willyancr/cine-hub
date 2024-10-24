"use client";
import { IconInfoSquareRounded, IconStar } from "@tabler/icons-react";
import { convertRuntime, formatCurrency } from "@/app/utils/conversion";
import ReviewSection from "@/app/components/card-review";
import { MovieDetails } from "@/app/types/movie-details";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/axios";
import Image from "next/image";

export default function DetailsMovie({ params }: { params: { id: string } }) {
  const [detailsMovies, setDetailsMovies] = useState<MovieDetails>();
  const id = params.id;

  useEffect(() => {
    api.get(`/movie/${id}`).then((response) => {
      setDetailsMovies(response.data);
    });
  }, [id, setDetailsMovies]);

  return (
    <main className="mb-40 max-h-screen w-full flex-grow p-6">
      <div className="mt-10 flex flex-col gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          Detalhes do Filme
          <IconInfoSquareRounded
            stroke={1.5}
            size={32}
            className="text-primary"
          />
        </h1>
        <Card className="mt-12 w-full max-w-4xl overflow-hidden text-white">
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

              <div className="mt-6 flex w-full flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
                <Button className="w-full rounded-xl bg-gradient-custom text-white transition-all hover:brightness-110 lg:w-auto">
                  Adicionar à Wachtlist
                </Button>
                <Button className="w-full rounded-xl bg-gradient-custom text-white transition-all hover:brightness-110 lg:w-auto">
                  Marcar como Assistido
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Reviews */}
        <ReviewSection id={id} review={'movie'} />
      </div>
    </main>
  );
}
