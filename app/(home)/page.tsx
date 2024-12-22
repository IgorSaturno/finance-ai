import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { isMatch } from "date-fns";
import { Navbar } from "../_components/navbar";
import { TimeSelect } from "./_components/time-select";
import { SummaryCards } from "./_components/summary-cards";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { getDashboard } from "../data/get-dashboard";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { LastTransactions } from "./_components/last-transactions";
import { canUserAddTransaction } from "../data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
import { ScrollArea } from "../_components/ui/scroll-area";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-10 lg:overflow-hidden">
        {/* <div className="flex items-center justify-center"> */}
        {/* </div> */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          <h1 className="pb-2 text-2xl font-bold lg:pb-0">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={user.publicMetadata.subscriptionPlan == "premium"}
            />
            <TimeSelect />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
          <div className="flex flex-col gap-4 lg:overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />

            <div className="grid w-full items-center gap-6 lg:grid-cols-3">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <ScrollArea className="mt-4 h-[500px]">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
