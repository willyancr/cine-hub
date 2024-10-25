import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Busca todos os filmes da watchlist, incluindo os dados do filme
    const watchlist = await prisma.watchlist.findMany({
      include: { movie: true }, // Relaciona com o modelo de filmes
    });

    // Retorna a lista de filmes da watchlist
    return NextResponse.json({ watchlist }, { status: 200 });
  } catch (error) {
    console.error("Não é possível obter a lista de watchlist", error);

    // Retorna a resposta de erro com status 500
    return NextResponse.json(
      { error: "Não é possível obter a lista de watchlist" },
      { status: 500 }
    );
  }
}
