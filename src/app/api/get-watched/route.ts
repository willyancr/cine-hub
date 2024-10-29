import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

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

    // Busca todos os filmes da watched, incluindo os dados do filme
    const watched = await prisma.watched.findMany({
      where: { userId },
      include: { movie: true }, // Relaciona com o modelo de filmes
    });

    // Retorna a lista de filmes da watched
    return NextResponse.json({ watched }, { status: 200 });
  } catch (error) {
    console.error("Não é possível obter a lista de watched", error);

    // Retorna a resposta de erro com status 500
    return NextResponse.json(
      { error: "Não é possível obter a lista de watched" },
      { status: 500 },
    );
  }
}
