import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Coins, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useApp } from "../context/AppContext";

interface Transaction {
  id: number;
  type: "earned" | "spent";
  amount: number;
  description: string;
  date: string;
}

const staticTransactions: Transaction[] = [
  { id: 1, type: "earned", amount: 10, description: "Taught React session to Sarah Chen", date: "2026-04-25" },
  { id: 2, type: "spent", amount: 10, description: "Learned Python from Marcus Johnson", date: "2026-04-24" },
  { id: 3, type: "earned", amount: 10, description: "Taught TypeScript to David Kim", date: "2026-04-22" },
];

export function CreditBalance() {
  const { credits } = useApp();

  return (
    <Card className="p-6 shadow-[var(--shadow-md)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-[var(--muted-foreground)] mb-1">Available Credits</p>
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-[var(--primary)]" />
            <span className="text-3xl font-semibold">{credits}</span>
          </div>
        </div>
        <Button className="bg-[var(--primary)] text-[var(--navy)] hover:bg-[var(--primary-hover)]">
          <Plus className="h-4 w-4 mr-2" />
          Buy Credits
        </Button>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">Recent Transactions</h4>
        {staticTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)]"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  transaction.type === "earned"
                    ? "bg-[var(--success-light)] text-[var(--success)]"
                    : "bg-[var(--warning-light)] text-[var(--warning)]"
                }`}
              >
                {transaction.type === "earned" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{transaction.description}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <span
              className={`font-semibold ${
                transaction.type === "earned" ? "text-[var(--success)]" : "text-[var(--warning)]"
              }`}
            >
              {transaction.type === "earned" ? "+" : "-"}{transaction.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-[var(--accent)] border border-[var(--primary)]/20">
        <p className="text-sm">
          <span className="font-medium text-[var(--primary)]">Tip:</span> Earn credits by
          teaching sessions or purchase them to book more learning sessions!
        </p>
      </div>
    </Card>
  );
}
