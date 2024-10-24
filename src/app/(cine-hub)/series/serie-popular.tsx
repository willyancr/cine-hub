"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { IconStar, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/axios";
import { VideoContent } from "@/app/types/video-content";
import Link from "next/link";

export default function SeriePopular() {
  const [series, setSeries] = useState<VideoContent>({ results: [] });

  useEffect(() => {
    api.get(`/tv/popular`).then((response) => {
      setSeries(response.data);
    });
  }, [setSeries]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mt-5 flex items-center gap-2 text-3xl font-bold">
        <IconTrendingUp stroke={1.5} size={32} className="text-primary" />
        Populares
      </h1>
      <div className="grid grid-cols-1 gap-1">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="w-full"
        >
          {series.results?.map((serie) => (
            <SwiperSlide key={serie.id}>
              <Link href={`/detalhes-serie/${serie.id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMG}${serie.poster_path}`}
                  alt={`Capa da serie ${serie.title}`}
                  width={900}
                  height={900}
                  quality={100}
                  className="h-[190px] w-full rounded-xl"
                />
              </Link>
              <div className="absolute right-2 top-1 flex items-center gap-1 rounded-xl bg-secondary/40 px-2 py-1 text-xs">
                {serie.vote_average.toFixed(1)}
                <IconStar stroke={1.5} size={12} className="text-primary" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
