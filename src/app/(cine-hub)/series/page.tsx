import InputSearch from "@/app/components/input-search";
import { IconDeviceTv } from "@tabler/icons-react";
import SeriePopular from "./serie-popular";
import SerieShowing from "./serie-top-rated";
import SerieUpComing from "./serie-upcoming";

export default function Series() {
  return (
    <main className="mb-10 w-full flex-grow p-6">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <IconDeviceTv stroke={1.5} size={32} className="text-primary" />
            Series
          </h1>
          <InputSearch placeholder="Pesquisar series" />
        </div>
        <SeriePopular />
        <SerieShowing />
        <SerieUpComing />
      </div>
    </main>
  );
}
