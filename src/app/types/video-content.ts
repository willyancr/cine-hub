type VideoContentResult = {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  name: string;
  media_type: string
};

export type VideoContent = {
  results: VideoContentResult[];
};
