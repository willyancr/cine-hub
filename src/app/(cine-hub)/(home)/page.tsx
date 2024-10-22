"use client";
import { CardDescover } from "@/app/components/card-discovers";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IconDeviceTv, IconMovie } from "@tabler/icons-react";
import InputSearch from "@/app/components/input-search";

export default function Home() {
  const discovers = [
    {
      id: "01",
      url: "/capa-superman.jpg",
      title: "Superman",
      description: "Um super-herói de superpoderes",
    },
    {
      id: "02",
      url: "/capa-batman.jpg",
      title: "Batman",
      description: "Um super-herói de superpoderes",
    },
  ];
  return (
    <main className="max-h-screen w-full flex-grow p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Destaques</h1>
          <InputSearch />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {discovers.map((discover) => (
            <div key={discover.id}>
              <CardDescover
                url={discover.url}
                title={discover.title}
                description={discover.description}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="mt-5 flex items-center gap-2 text-3xl font-bold">
            <IconMovie stroke={1.5} size={32} />
            Filmes Populares
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
              {[...Array(7)].map((_, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src="/capa-superman.jpg"
                    alt="capa-superman"
                    width={200}
                    height={200}
                    className="h-[190px] w-full rounded-xl object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="mt-5 flex items-center gap-2 text-3xl font-bold">
            <IconDeviceTv stroke={1.5} size={32} />
            Series Populares
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
              {[...Array(7)].map((_, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src="/capa-superman.jpg"
                    alt="capa-superman"
                    width={200}
                    height={200}
                    className="h-[190px] w-full rounded-xl object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </main>
  );
}
