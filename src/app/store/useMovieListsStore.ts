import toast from "react-hot-toast";
import { create } from "zustand";

export type MovieProps = {
  movieId: string;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
  userId: string;
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

      // Atualiza a lista de watchlists com o novo filme adicionado
      set((state) => ({ watchlists: [...state.watchlists, movie] }));
    } catch (error) {
      console.error("Erro ao adicionar na watchlist:", error);
      toast.error(`Erro ao adicionar na watchlist, tente mais tarde!`);
    }
  },
  isInWatchlist: (movieId: string) => {
    return get().watchlists.some((movie) => movie.movieId === movieId);
  },
  addToWatched: async (movie) => {
    try {
      if (get().isInWatched(movie.movieId)) {
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
    } catch (error) {
      console.error("Erro ao adicionar na watched:", error);
      toast.error(`Erro ao adicionar na watchlist, tente mais tarde!`);
    }
  },
  isInWatched: (movieId: string) => {
    return get().watcheds.some((movie) => movie.movieId === movieId);
  },
}));
