import Image from "next/image";
import {
  IconDeviceTv,
  IconHome,
  IconHourglassHigh,
  IconMovie,
  IconSquareRoundedCheck,
} from "@tabler/icons-react";
import NaviBar from "./navibar";

export default function SideBar() {
  return (
    <div className="flex ">
      <aside className="m-5 flex h-screen w-56 flex-col rounded-xl bg-gradient-to-br from-[#141E30] to-[#243B55] p-6">
        <div className="mb-16 mt-5 flex items-center justify-center gap-3">
          <Image
            src="/icon-logo.png"
            alt="logo"
            width={40}
            height={40}
            quality={100}
            className="h-8 w-8"
          />

          <span className="text-2xl font-bold">CineHub</span>
        </div>
        <nav className="flex flex-col gap-4">
          <NaviBar href="/" >
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
          <NaviBar href="/wachtlist">
            <IconHourglassHigh stroke={1.5} />
            WachtList
          </NaviBar>
          <NaviBar href="/assistidos">
            <IconSquareRoundedCheck stroke={1.5} />
            Assitidos
          </NaviBar>
        </nav>
      </aside>
    </div>
  );
}
