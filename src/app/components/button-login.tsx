"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";
import { IconBrandGoogleFilled, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function ButtonLogin() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login!");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Você saiu da sua conta!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout!");
    }
  };
  return session ? (
    <Button
      onClick={handleSignOut}
      className="flex w-full max-w-xs items-center justify-between gap-2 overflow-hidden rounded-xl bg-gradient-custom px-4 py-2 text-white shadow-xl transition-all hover:brightness-110"
    >
      <Image
        src={session.user.image || ""}
        alt="Foto do usuário"
        width={24}
        height={24}
        quality={100}
        className="rounded-full"
      />
      <span className="hidden truncate text-xs font-semibold sm:flex sm:max-w-[120px]">
        {session.user?.name}
      </span>
      <IconX className="h-5 w-5" />
    </Button>
  ) : (
    <Button
      onClick={handleSignIn}
      className="w-full rounded-xl bg-gradient-custom text-white shadow-xl transition-all hover:brightness-110"
    >
      <IconBrandGoogleFilled />
      Login com Google
    </Button>
  );
}
