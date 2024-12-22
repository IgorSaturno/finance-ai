"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DrawerMenu } from "./drawer-menu";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();

  function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia(query);
      const updateMatch = () => setMatches(mediaQuery.matches);
      updateMatch();
      mediaQuery.addEventListener("change", updateMatch);
      return () => mediaQuery.removeEventListener("change", updateMatch);
    }, [query]);

    return matches;
  }

  const isLgSceen = useMediaQuery("(min-width: 1024px)");
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      {/* {ESQUERDA - MOBILE MENU E LOGO} */}
      <div className="flex items-center gap-4">
        {/* Botão de menu para mobile */}
        <div className="lg:hidden">
          <DrawerMenu />
        </div>
        {/* Logo */}
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
      </div>
      <div className="hidden items-center gap-10 lg:flex">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Assintura
        </Link>
      </div>
      {/* {DIREITA}*/}

      <UserButton showName={isLgSceen} />
    </nav>
  );
}
