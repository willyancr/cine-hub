import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type MovieProps = {
  movieId: string;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
  userId: string;
};

export async function POST(request: Request) {
  const body: MovieProps = await request.json();
  const { userId,movieId, title, name, poster_path, vote_average } = body;

  try {
    const existingMovieInWatchlist = await prisma.watchlist.findFirst({
      where: { movieId },
    });

    // Verifica se o filme já está na watchlist
    if (existingMovieInWatchlist) {
      return NextResponse.json(
        { message: "Este filme já está na sua watchlist" },
        { status: 400 },
      );
    }

    // Se não estiver, continua o processo de adição
    const movie = await prisma.movie.upsert({
      where: { id: movieId },
      update: {}, // Não atualiza nada no caso de já existir
      create: {
        id: movieId,
        title: title || "",
        name: name || "",
        poster_path,
        vote_average,
      },
    });

    // Adiciona à watchlist
    const watchlist = await prisma.watchlist.create({
      data: {
        userId,
        movieId: movie.id,
      },
    });

    return NextResponse.json(
      { message: "Filme adicionado à sua watchlist", watchlist },
      { status: 200 },
    );
  } catch (error) {
    console.error("Não foi possivel adicionar na watchlist", error);
    NextResponse.json(
      { error: "Não foi possivel adicionar na watchlist" },
      { status: 500 },
    );
  }
}
