"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBrandGoogleFilled, IconLogin2 } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function CardLogin() {
  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login, tente novamente!");
    }
  };
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
          <IconLogin2 />
          Login
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          Faça login para acessar sua conta e adicionar filmes e séries à sua
          lista de <strong className="text-primary">Watchlist</strong> e{" "}
          <strong className="text-primary">Assistidos</strong>.
        </p>
        <Button
          onClick={handleSignIn}
          className="w-full rounded-xl"
          variant="outline"
        >
          <IconBrandGoogleFilled />
          Login com Google
        </Button>
      </CardContent>
    </Card>
  );
}
