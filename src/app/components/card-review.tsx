import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { IconStar } from "@tabler/icons-react";
import { VideoReviews } from "../types/video-reviews";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export default function ReviewSection({ id, review }: { id: string, review: string }) {
  const [reviews, setReviews] = useState<VideoReviews>({ results: [] });

  useEffect(() => {
    api.get(`${review}/${id}/reviews`).then((res) => setReviews(res.data));
  }, [id, review]);

  return (
    <>
      {reviews.results.map((review, index) => (
        <div key={index} className="w-full max-w-4xl py-8">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            Reviews
            <IconStar stroke={1.5} size={24} className="text-primary" />
          </h2>

          <Card className="w-full max-w-4xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMG}${review.author_details.avatar_path}`}
                    alt={review.author_details.name[0]}
                  />
                  <AvatarFallback>{review.author_details.name}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-semibold text-gray-100">
                    {review.author_details.name}
                  </p>
                  <div className="flex gap-1">
                    <IconStar stroke={1.5} size={16} className="text-primary" />
                    <span className="text-sm font-medium">
                      {review.author_details.rating.toFixed(1)}/10
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-gray-500">
                {review.content}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}
