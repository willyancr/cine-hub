import InputSearch from "@/app/components/input-search";
import { IconMovie } from "@tabler/icons-react";
import MoviePopular from "./movie-popular";
import MovieTopRated from "./movie-top-rated";
import MovieTrending from "./movie-trending";

export default function Movies() {
  return (
    <main className="mb-10 w-full flex-grow p-6">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <IconMovie stroke={1.5} size={32} className="text-primary" />
            Filmes
          </h1>
          <InputSearch placeholder="Pesquisar filmes" />
        </div>
        <MovieTrending />
        <MoviePopular />
        <MovieTopRated />
      </div>
    </main>
  );
}
