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
  const { userId, movieId, title, name, poster_path, vote_average } = body;

  try {
    // Verifica se o filme já está na watchlist, se estiver deleta
    const existingMovieInWatchlist = await prisma.watchlist.findFirst({
      where: { movieId, userId },
    });

    if (existingMovieInWatchlist) {
      await prisma.watchlist.deleteMany({
        where: { movieId, userId },
      });
      return NextResponse.json(
        { message: "Filme removido da sua watchlist." },
        { status: 200 },
      );
    }
    // Verifica se o filme já está na watched
    const existingMovieInWatched = await prisma.watched.findFirst({
      where: { movieId, userId },
    });

    if (existingMovieInWatched) {
      return NextResponse.json(
        { message: "Este filme já está na sua watched" },
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

    // Adiciona à watched
    const watched = await prisma.watched.create({
      data: {
        userId,
        movieId: movie.id,
      },
    });

    return NextResponse.json(
      { message: "Filme adicionado à sua watched", watched },
      { status: 200 },
    );
  } catch (error) {
    console.error("Não foi possivel adicionar na watched", error);
    NextResponse.json(
      { error: "Não foi possivel adicionar na watched" },
      { status: 500 },
    );
  }
}
