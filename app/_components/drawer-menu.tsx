import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";

export function DrawerMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">☰</Button>
      </DialogTrigger>
      <DialogContent className="w-[250px]">
        <nav className="flex flex-col gap-2">
          <Link href="/" className="text-lg">
            Dashboard
          </Link>
          <Link href="/transactions" className="text-lg">
            Transações
          </Link>
          <Link href="/subscription" className="text-lg">
            Assinatura
          </Link>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
