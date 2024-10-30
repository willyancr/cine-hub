import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Busca o ID do usuário logado
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { message: "Nenhum usuário logado" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    // Busca todos os filmes da watchlist, incluindo os dados do filme
    const watchlist = await prisma.watchlist.findMany({
      where: { userId },
      include: { movie: true }, // Relaciona com o modelo de filmes
    });

    // Retorna a lista de filmes da watchlist
    return NextResponse.json({ watchlist }, { status: 200 });
  } catch (error) {
    console.error("Não é possível obter a lista de watchlist", error);
    return NextResponse.json(
      { error: "Não é possível obter a lista de watchlist" },
      { status: 500 },
    );
  }
}
