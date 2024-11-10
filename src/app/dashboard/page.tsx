import { ServerSideToast } from "@/lib/components/ServerSideToast";
import StyledCard from "@/lib/components/StyledCard";
import db from "@/lib/primsa";
import { formatCurrency, getWeekLabel } from "@/lib/utils";

export default async function Home() {
  const today: Date = new Date(Date.now());
  const thisWeek: string = getWeekLabel(today);

  const alerts: string[] = [];

  //gets the yearly amount from the DB
  const yearlyAmount = await db.payout.aggregate({
    where: {
      date: {
        gte: new Date("01/01/2024"),
      },
    },
    _sum: {
      amount: true,
    },
  });

  //finds upcoming invoices within 7 days to alert the user
  const maxDate: Date = new Date(Date.now());
  maxDate.setDate(today.getDate() + 7);

  const upcomingInvoices = await db.invoice.findMany({
    where: {
      due: { gte: today, lte: maxDate },
    },
  });

  if (upcomingInvoices.length) {
    alerts.push(`You have ${upcomingInvoices.length} upcoming invoices`);
  }

  //gets the weekly amount from the db
  const weeklyAmount = await db.payout.aggregate({
    where: {
      date: {
        gte: new Date(thisWeek + `/${today.getFullYear()}`),
      },
    },
    _sum: {
      amount: true,
    },
  });

  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <StyledCard title="Total Earnings">
          <div className="flex flex-row justify-between p-2">
            <div>Yearly Earnings:</div>
            <div>{formatCurrency(yearlyAmount._sum.amount || 0)}</div>
          </div>
          <div className="flex flex-row justify-between p-2">
            <div>Weekly Earnings:</div>
            <div>{formatCurrency(weeklyAmount._sum.amount || 0)}</div>
          </div>
        </StyledCard>
        <ServerSideToast alerts={alerts} />
      </main>
    </div>
  );
}
