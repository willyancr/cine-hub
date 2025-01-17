"use client";
import { CardDiscover } from "@/app/(cine-hub)/(home)/card-discovers";
import { IconSparkles } from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieTrending from "./movie-trending";
import SeriesTrending from "./series-trending";

export default function Home() {
  const discovers = [
    {
      id: "01",
      url: "/capa-superman.jpg",
      title: "Superman",
      description: "Um super-herói de superpoderes",
    },
    {
      id: "02",
      url: "/logo-3.jpg",
      title: "",
      description:
        "Seu catálogo pessoal e intuitivo para organizar seus filmes e séries favoritos",
    },
  ];

  return (
    <main className="w-full flex-grow p-6">
      <div className="flex flex-col gap-4">
        <div className="my-6 flex justify-center sm:my-0 sm:justify-start">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <IconSparkles stroke={1.5} size={32} className="text-primary" />
            Destaques
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {discovers.map((discover) => (
            <div key={discover.id}>
              <CardDiscover
                url={discover.url}
                title={discover.title}
                description={discover.description}
              />
            </div>
          ))}
        </div>
        <MovieTrending />
        <SeriesTrending />
      </div>
    </main>
  );
}
