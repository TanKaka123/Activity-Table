import { TokenType, Transaction, TransactionType } from "../_types";

export const generateMockData = (): Transaction[] => {
  const types: TransactionType[] = ["Stake", "Borrow", "Lend"];
  const tokens: TokenType[] = ["ETH", "USDC", "DAI", "BTC", "SOL"];
  const usernames = [
    "alice_web3",
    "bob_crypto",
    "charlie_defi",
    "dave_hodl",
    "eve_trader",
    "frank_staker",
    "grace_lender",
    "henry_borrower",
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `tx-${i + 1}`,
    username: usernames[Math.floor(Math.random() * usernames.length)],
    type: types[Math.floor(Math.random() * types.length)],
    token: tokens[Math.floor(Math.random() * tokens.length)],
    amount: Number.parseFloat((Math.random() * 10000).toFixed(2)),
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ),
  }));
};
