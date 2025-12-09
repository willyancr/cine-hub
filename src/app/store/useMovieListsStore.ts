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
  fetchWatchlist: () => Promise<void>;
  fetchWatched: () => Promise<void>;
  addToWatchlist: (movie: MovieProps) => void;
  isInWatchlist: (movieId: string) => boolean;
  addToWatched: (movie: MovieProps) => void;
  isInWatched: (movieId: string) => boolean;
};

export const useStore = create<MovieListsStore>((set, get) => ({
  watchlists: [],
  watcheds: [],

  fetchWatchlist: async () => {
    try {
      const response = await fetch(`/api/get-watchlist`);
      if (!response.ok) throw new Error("Erro ao buscar watchlist");
      
      const data = await response.json();
      
      const mappedWatchlist = data.watchlist.map((item: any) => ({
        movieId: item.movieId,
        title: item.movie.title,
        name: item.movie.name,
        poster_path: item.movie.poster_path,
        vote_average: item.movie.vote_average,
        userId: item.userId,
      }));
      
      set({ watchlists: mappedWatchlist });
    } catch (error) {
      console.error("Erro ao buscar watchlist:", error);
    }
  },
  
  fetchWatched: async () => {
    try {
      const response = await fetch(`/api/get-watched`);
      if (!response.ok) throw new Error("Erro ao buscar watched");
      
      const data = await response.json();
      
      const mappedWatched = data.watched.map((item: any) => ({
        movieId: item.movieId,
        title: item.movie.title,
        name: item.movie.name,
        poster_path: item.movie.poster_path,
        vote_average: item.movie.vote_average,
        userId: item.userId,
      }));
      
      set({ watcheds: mappedWatched });
    } catch (error) {
      console.error("Erro ao buscar watched:", error);
    }
  },

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
