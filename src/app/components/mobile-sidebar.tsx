import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  IconDeviceTv,
  IconHome,
  IconHourglassHigh,
  IconMenu2,
  IconMovie,
  IconSquareRoundedCheck
} from "@tabler/icons-react";
import Image from "next/image";
import ButtonLogin from "./button-login";
import InputSearch from "./input-search";
import NaviBar from "./navibar";

export default function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden fixed top-4 left-4 z-50">
        <IconMenu2 size={24} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-gradient-to-br from-[#141E30] to-[#243B55] p-6">
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
        <div className="mt-auto absolute bottom-4 left-4 right-4">
          <ButtonLogin />
        </div>
      </SheetContent>
    </Sheet>
  );
}