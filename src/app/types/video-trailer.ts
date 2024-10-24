type VideoTrailerResult = {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
};

export type VideoTrailer = {
  results: VideoTrailerResult[];
};
