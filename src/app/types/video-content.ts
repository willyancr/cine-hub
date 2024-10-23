type VideoContentResult = {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
};

export type VideoContent = {
  results: VideoContentResult[];
};
