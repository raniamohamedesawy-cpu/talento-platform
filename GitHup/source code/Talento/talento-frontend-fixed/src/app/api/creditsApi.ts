import api from "../lib/axiosInstance";

export type CreditTransaction = {
  id: number;
  user?: any;
  type: "EARNED" | "SPENT";
  amount: number;
  description: string;
  sessionId?: number | null;
  createdAt?: string;
};

export async function getBalance() {
  const res = await api.get<{ credits: number }>("/api/credits/balance");
  return res.data;
}

export async function getTransactions() {
  const res = await api.get<CreditTransaction[]>("/api/credits/transactions");
  return res.data;
}

