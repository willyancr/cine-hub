"use client";
type Props = {
  url: string;
  title: string;
  description: string;
};
export function CardDescover({ url, title, description }: Props) {
  return (
    <div className="group/card w-full max-w-xs">
      <div
        style={{ backgroundImage: `url(${url})` }}
        className="card relative mx-auto flex h-60 w-[370px] cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-cover p-4 shadow-xl xl:w-[400px]"
      >
        <div className="absolute left-0 top-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>

        <div className="mt-auto">
          <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">
            {title}
          </h1>
          <p className="relative z-10 my-4 text-sm font-normal text-gray-50">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
