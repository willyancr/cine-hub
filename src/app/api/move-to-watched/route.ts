import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type MovieProps = {
  movieId: string;
};

export async function POST(req: Request) {
  const body: MovieProps = await req.json();
  const { movieId } = body;

  await prisma.$transaction(async (tx) => {
    // Remove da watchlist
    await tx.watchlist.deleteMany({
      where: {
        movieId,
      },
    });
    // Adiciona aos assistidos
    await tx.watched.create({
      data: {
        movieId,
      },
    });
  });
  return NextResponse.json(
    { message: "Filme movido aos assistidos" },
    { status: 200 },
  );
}
