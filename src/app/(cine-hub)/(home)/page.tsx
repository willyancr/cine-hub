import { CardDescover } from "@/app/components/card-discovers";

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
    <main className="m-5 flex-grow p-6">
      <div className="flex flex-col gap-4">
        <h1 className="mt-5 text-3xl font-bold">Destaques</h1>
        <div className="flex items-center gap-20 xl:gap-32">
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
        <div>
          <h1 className="mt-5 text-3xl font-bold">Filmes Populares</h1>
          <div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
