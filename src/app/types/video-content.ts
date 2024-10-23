type VideoContentResult = {
  id: number;
  poster_path: string;
  vote_average: number;
};

export type VideoContent = {
  results: VideoContentResult[];
};
