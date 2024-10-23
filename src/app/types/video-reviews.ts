type VideoReviewsResult = {
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  url: string;
};
export type VideoReviews = {
  
  results: VideoReviewsResult[];
};
