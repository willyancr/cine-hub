import { IconUserPlus } from "@tabler/icons-react";
import { CardWachtlist } from "./card-wachtlist";

export default function Wachtlist() {
  const discovers = [
    {
      id: "01",
      url: "/capa-superman.jpg",
      title: "Superman",
    },
    {
      id: "02",
      url: "/capa-batman.jpg",
      title: "Batman",
    },
    {
      id: "03",
      url: "/capa-batman.jpg",
      title: "Batman",
    },
  ];
  return (
    <main className="mb-40 max-h-screen w-full flex-grow p-6">
      <div className="mt-10 flex flex-col gap-12">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <IconUserPlus stroke={1.5} size={32} className="text-primary" />
          Wachtlist
        </h1>

        <span className="w-full border-b">
          Você tem {discovers.length ? discovers.length : 0} filme/serie(s) na
          sua lista.
        </span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {discovers.map((discover) => (
            <div key={discover.id}>
              <CardWachtlist url={discover.url} title={discover.title} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
