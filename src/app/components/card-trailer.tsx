import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { VideoTrailer } from "../types/video-trailer";
import { api } from "../lib/axios";

type TrailerProp = {
  id: string;
  trailerType: string;
};

export default function CardTrailer({ id, trailerType }: TrailerProp) {
  const [trailers, setTrailers] = useState<VideoTrailer>({ results: [] });

  useEffect(() => {
    api
      .get(`/${trailerType}/${id}/videos`)
      .then((res) => setTrailers(res.data));
  }, [id, trailerType]);

  return (
    <>
      {trailers.results
        .filter((video) => video.type === "Trailer")
        .slice(0, 1)
        .map((trailer) => (
          <Card key={trailer.id} className="mx-auto mb-10 w-full max-w-4xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Trailer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute left-0 top-0 h-full w-full rounded-xl"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
