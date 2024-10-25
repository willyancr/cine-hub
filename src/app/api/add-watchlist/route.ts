import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type MovieProps = {
  movieId: string;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
};

export async function POST(request: Request) {
  const body: MovieProps = await request.json();
  const { movieId, title, name, poster_path, vote_average } = body;

  try {
    const movie = await prisma.movie.upsert({
      where: { id: movieId },
      update: {},
      create: {
        id: movieId,
        title: title || "",
        name: name || "",
        poster_path,
        vote_average,
      },
    });

    const watchlist = await prisma.watchlist.create({
      data: { movieId: movie.id },
    });

    return NextResponse.json(
      { message: "Adicionado na watchlist", watchlist },
      { status: 201 },
    );
  } catch (error) {
    console.error("Não foi possivel adicionar na watchlist", error);
    NextResponse.json(
      { error: "Não foi possivel adicionar na watchlist" },
      { status: 500 },
    );
  }
}
