import { db } from "../_lib/prisma";
import { transactionColumns } from "./_columns";
import { DataTable } from "../_components/ui/data-table";
import { AddTransactionButton } from "../_components/add-transaction-button";
import { Navbar } from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../data/can-user-add-transaction";

export default async function TransactionsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  // acessar as transaçoes do meu banco de dados
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-1 px-6 py-2 lg:overflow-hidden">
        {/* Titulo e Botão */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold lg:text-2xl">Transações</h1>
          <div className="flex space-x-2 p-2">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        </div>

        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </>
  );
}
