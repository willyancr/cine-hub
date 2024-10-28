export type MovieProps = {
  movieId: number;
  movie: {
    title: string;
    name: string;
    poster_path: string;
    vote_average: number;
  };
};