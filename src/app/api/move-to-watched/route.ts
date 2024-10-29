import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type MovieProps = {
  movieId: string;
  userId: string;
};

export async function POST(req: Request) {
  const body: MovieProps = await req.json();
  const { movieId, userId } = body;

  await prisma.$transaction(async (tx) => {
    // Remove da watchlist
    await tx.watchlist.deleteMany({
      where: {
        movieId,
        userId,
      },
    });
    // Adiciona aos assistidos
    await tx.watched.create({
      data: {
        movieId,
        userId,
      },
    });
  });
  return NextResponse.json(
    { message: "Filme movido aos assistidos" },
    { status: 200 },
  );
}
