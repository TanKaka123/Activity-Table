export type TransactionType = "Stake" | "Borrow" | "Lend";
export type TokenType = "ETH" | "USDC" | "DAI" | "BTC" | "SOL";

export type Transaction = {
  id: string;
  username: string;
  type: TransactionType;
  token: TokenType;
  amount: number;
  date: Date;
};
