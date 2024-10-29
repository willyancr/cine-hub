import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type MovieProps = {
  movieId: string;
  userId: string;
};

export async function DELETE(req: Request) {
  const body: MovieProps = await req.json();
  const { movieId, userId } = body;

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return NextResponse.json(
        { error: "Filme não encontrado na watchlist" },
        { status: 404 },
      );
    }

    const watchlist = await prisma.watchlist.deleteMany({
      where: {
        movieId,
        userId,
      },
    });

    if (watchlist.count === 0) {
      return NextResponse.json(
        { error: "Nenhum filme encontrado para deletar" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Filme deletado da watchlist", watchlist },
      { status: 200 },
    );
  } catch (error) {
    console.error("Não foi possivel deletar da watchlist", error);
  }
}
