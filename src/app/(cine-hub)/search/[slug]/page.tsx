"use client";
import { IconSearch } from "@tabler/icons-react";
import { VideoContent } from "@/app/types/video-content";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/axios";
import { CardSearch } from "./card-search";

export default function Search({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const [searchs, setSearchs] = useState<VideoContent>({ results: [] });

  useEffect(() => {
    api.get(`/search/multi?query=${slug}`).then((response) => {
      setSearchs(response.data);
    });
  }, [slug]);

  return (
    <main className="mb-10 w-full flex-grow p-6">
      <div className="mt-10 flex flex-col gap-12">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <IconSearch stroke={1.5} size={32} className="text-primary" />
          Busca
        </h1>

        <p className="w-full border-b">
          Resultado encontrado com o nome de:{" "}
          <span className="font-semibold capitalize text-primary">
            {slug.split("%20").join(" ")}
          </span>
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {searchs.results
            .filter(
              (search) =>
                search.media_type === "movie" || search.media_type === "tv",
            )
            .map((search) => (
              <div key={search.id}>
                <CardSearch
                  id={search.id}
                  title_movie={search.title}
                  name_serie={search.name}
                  poster={search.poster_path}
                  vote_average={search.vote_average}
                  media_type={search.media_type}
                />
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
