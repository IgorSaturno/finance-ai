import { ArrowDownUp } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { transactionColumns } from "./_columns";
import { DataTable } from "../_components/ui/data-table";

export default async function TransactionsPage() {
  // acessar as transaçoes do meu banco de dados
  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      {/* Titulo e Botão */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transaçoes</h1>
        <Button className="rounded-full font-bold">
          Adicionar Transação
          <ArrowDownUp />
        </Button>
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
}
