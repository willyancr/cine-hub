"use client";
type Props = {
  url: string;
  title: string;
  description: string;
};
export function CardDescover({ url, title, description }: Props) {
  return (
    <div className="group/card w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div
        style={{ backgroundImage: `url(${url})` }}
        className="card relative mx-auto flex h-60 w-full max-w-[350px] flex-col justify-between overflow-hidden rounded-xl bg-cover bg-center p-4 shadow-xl sm:h-60 sm:max-w-[400px] md:h-60 xl:h-60 xl:max-w-[450px]"
      >
        <div className="absolute left-0 top-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>

        <div className="mt-auto">
          <h1 className="relative z-10 text-xl font-bold text-gray-50 sm:text-2xl md:text-3xl">
            {title}
          </h1>
          <p className="relative z-10 my-4 text-sm font-normal text-gray-50 sm:text-base md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
