"use client";
import Button from "@/app/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/Table";
import { Badge } from "@/app/components/ui/Badge";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/date";
import { cn } from "@/utils/tailwind";
import { Transaction, TransactionType } from "../_types";

const getBadgeVariant = (type: TransactionType) => {
  switch (type) {
    case "Stake":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Borrow":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "Lend":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "";
  }
};
const TABLE_HEADINGS: {
  value: keyof Transaction;
  label: string;
  align: "left" | "right";
}[] = [
  {
    value: "username",
    label: "Username",
    align: "right",
  },
  {
    value: "type",
    label: "Type",
    align: "right",
  },
  {
    value: "token",
    label: "Token",
    align: "right",
  },
  {
    value: "amount",
    label: "Amount",
    align: "left",
  },
  {
    value: "date",
    label: "Date",
    align: "left",
  },
];

type TransactionTableProps = {
  requestSort: (key: keyof Transaction) => void;
  paginatedTransactions: Transaction[];
};

export const TransactionTable = ({
  requestSort,
  paginatedTransactions,
}: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TABLE_HEADINGS.map((heading, index) => (
            <TableHead key={`${heading.value}-${index}`} className="w-[180px]">
              <Button
                variant="ghost"
                onClick={() => requestSort(heading.value)}
                className={cn(
                  "flex items-center gap-1 font-medium  focus:outline-none focus:ring-0 !outline-none !ring-0",
                  heading.align === "left" && "ml-auto"
                )}
                rightIcon={<ArrowsUpDownIcon height={16} width={16} />}
              >
                {heading.label}
              </Button>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedTransactions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No transactions found.
            </TableCell>
          </TableRow>
        ) : (
          paginatedTransactions.map((transaction, index) => (
            <TableRow
              key={transaction.id}
              className={index % 2 === 0 ? "bg-gray-300/80" : ""}
            >
              <TableCell className="pl-10 font-medium ">
                {transaction.username}
              </TableCell>
              <TableCell>
                <Badge className={`${getBadgeVariant(transaction.type)} ml-8`}>
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="text-left">
                <p className="pl-10">{transaction.token}</p>
              </TableCell>
              <TableCell className="text-right">
                <p className="pr-10">
                  {transaction.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </TableCell>
              <TableCell className="text-right">
                <p className="pr-10">{formatDate(transaction.date)}</p>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
