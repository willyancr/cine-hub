"use client";

import { api } from "@/app/lib/axios";
import { Movies } from "@/app/types/movies";
import { IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MovieShowing() {
  const [movies, setMovies] = useState<Movies>({ results: [] });

  useEffect(() => {
    api.get(`/movie/now_playing`).then((response) => {
      setMovies(response.data);
    });
  }, [setMovies]);

  console.log(movies.results);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mt-5 flex items-center gap-2 text-3xl font-bold">
        <IconPlayerPlay stroke={1.5} size={32} className="text-primary" />
        Em Cartaz
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
          {movies.results?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMG}${movie.poster_path}`}
                alt="capa-superman"
                width={900}
                height={900}
                quality={100}
                className="h-[190px] w-full rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
