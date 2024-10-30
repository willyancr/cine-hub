import Image from "next/image";
import {
  IconDeviceTv,
  IconHome,
  IconHourglassHigh,
  IconMovie,
  IconSquareRoundedCheck,
} from "@tabler/icons-react";
import NaviBar from "./navibar";
import InputSearch from "./input-search";
import ButtonLogin from "./button-login";

export default function SideBar() {
  return (
    <div className="flex h-screen">
      <aside className="m-5 flex w-56 flex-col rounded-xl bg-gradient-to-br from-[#141E30] to-[#243B55] p-6">
        <div className="mb-16 mt-5 flex items-center justify-center gap-3">
          <Image
            src="/logo-cinehub-1.png"
            alt="logo"
            width={1000}
            height={1000}
            quality={100}
            className="h-15 w-40"
          />
        </div>
        <nav className="flex flex-col gap-4">
          <NaviBar href="/">
            <IconHome stroke={1.5} />
            Home
          </NaviBar>
          <NaviBar href="/filmes">
            <IconMovie stroke={1.5} />
            Filmes
          </NaviBar>
          <NaviBar href="/series">
            <IconDeviceTv stroke={1.5} />
            Séries
          </NaviBar>
          <NaviBar href="/watchlist">
            <IconHourglassHigh stroke={1.5} />
            Quero Assitir
          </NaviBar>
          <NaviBar href="/assistidos">
            <IconSquareRoundedCheck stroke={1.5} />
            Assitidos
          </NaviBar>
          <InputSearch placeholder="Pesquisar" />
        </nav>
        <div className="mt-auto">
          <ButtonLogin />
        </div>
      </aside>
    </div>
  );
}
