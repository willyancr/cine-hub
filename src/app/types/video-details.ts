type Genres = {
  id: number;
  name: string;
};
type Country = {
  country: string;
};
export type VideoDetails = {
  budget: number;
  genres: Genres[];
  id: number;
  origin_country: Country[];
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  status: string;
  title: string;
  vote_average: number;
};
