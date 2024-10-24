import { IconSquareRoundedCheck } from "@tabler/icons-react";
import { CardAssisted } from "./card-assisted";

export default function Wachtlist() {
  const discovers = [
    {
      id: "01",
      url: "/capa-superman.jpg",
    },
    {
      id: "02",
      url: "/capa-batman.jpg",
    },
    {
      id: "03",
      url: "/capa-batman.jpg",
    },
  ];
  return (
    <main className="mb-40 max-h-screen w-full flex-grow p-6">
      <div className="mt-10 flex flex-col gap-12">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <IconSquareRoundedCheck
            stroke={1.5}
            size={32}
            className="text-primary"
          />
          Assistidos
        </h1>

        <span className="w-full border-b">
          Você tem {discovers.length ? discovers.length : 0} filme/serie(s) na
          sua lista.
        </span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {discovers.map((discover) => (
            <div key={discover.id}>
              <CardAssisted url={discover.url} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
