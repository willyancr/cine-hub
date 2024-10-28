import { create } from "zustand";

export type MovieProps = {
  movieId: string;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
};

type MovieListsStore = {
  watchlists: MovieProps[];
  watcheds: MovieProps[];
  addToWatchlist: (movie: MovieProps) => void;
  isInWatchlist: (movieId: string) => boolean;
  addToWatched: (movie: MovieProps) => void;
  isInWatched: (movieId: string) => boolean;
};

export const useStore = create<MovieListsStore>((set, get) => ({
  watchlists: [],
  watcheds: [],

  addToWatchlist: async (movie) => {
    try {
      // Primeiro verifica se o filme já está na lista
      if (get().isInWatchlist(movie.movieId)) {
        alert("Filme já está na watchlist!");
        return;
      }
      const response = await fetch(`/api/add-watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar na watchlist");
      }

      const data = await response.json();
      console.log("Success:", data);

      set((state) => ({ watchlists: [...state.watchlists, movie] }));

      alert("Filme adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar na watchlist:", error);
    }
  },
  isInWatchlist: (movieId: string) => {
    return get().watchlists.some((movie) => movie.movieId === movieId);
  },
  addToWatched: async (movie) => {
    try {
      if (get().isInWatched(movie.movieId)) {
        alert("Filme já está na watched!");
        return;
      }
      const response = await fetch(`/api/add-watched`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar na watched");
      }

      const data = await response.json();
      console.log("Success:", data);

      set((state) => ({ watcheds: [...state.watcheds, movie] }));

      alert("Filme adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar na watched:", error);
    }
  },
  isInWatched: (movieId: string) => {
    return get().watcheds.some((movie) => movie.movieId === movieId);
  },
}));
