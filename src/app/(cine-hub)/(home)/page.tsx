"use client";
import { CardDescover } from "@/app/components/card-discovers";
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
      url: "/capa-batman.jpg",
      title: "Batman",
      description: "Um super-herói de superpoderes",
    },
  ];
  return (
    <main className="max-h-screen w-full flex-grow p-6 mb-40">
      <div className="flex flex-col gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          Destaques
          <IconSparkles stroke={1.5} size={32} className="text-primary" />
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {discovers.map((discover) => (
            <div key={discover.id}>
              <CardDescover
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
