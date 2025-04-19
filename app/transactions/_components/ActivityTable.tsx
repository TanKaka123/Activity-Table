"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { Transaction, TransactionType } from "../_types";
import { generateMockData } from "../_mock";
import { PaginationControls } from "./PaginationControls";
import { TransactionTable } from "./TransactionTable";

const ALL_FILTER = "All" as const;
const ITEMS_PER_PAGE = 10;
const FILTER_VALUES = ["All", "Stake", "Borrow", "Lend"];

export default function ActivityTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const [activeFilter, setActiveFilter] = useState<
    TransactionType | typeof ALL_FILTER
  >(ALL_FILTER);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction | null;
    direction: "ascending" | "descending";
  }>({
    key: "date",
    direction: "descending",
  });

  useEffect(() => {
    const mockData = generateMockData();
    setTransactions(mockData);
    setFilteredTransactions(mockData);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTransactions]);

  const handleFilterChange = (type: TransactionType | typeof ALL_FILTER) => {
    setActiveFilter(type);
    if (type === ALL_FILTER) {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter((tx) => tx.type === type));
    }
  };

  const requestSort = React.useCallback(
    (key: keyof Transaction) => {
      let direction: "ascending" | "descending" = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
      setFilteredTransactions((prevTransactions) => {
        const sortedData = [...prevTransactions];
        sortedData.sort((a, b) => {
          if (a[key] < b[key]) {
            return direction === "ascending" ? -1 : 1;
          }
          if (a[key] > b[key]) {
            return direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
        return sortedData;
      });
    },
    [sortConfig, setSortConfig, setFilteredTransactions]
  );

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Card className="mx-auto w-full max-w-6xl">
      <CardHeader className="flex flex-col items-start justify-between space-y-2 pb-4 sm:flex-row sm:items-center sm:space-y-0">
        <CardTitle className="text-2xl font-bold">Activity Table</CardTitle>
        <div className="flex flex-wrap gap-2">
          {FILTER_VALUES.map((type: string) => (
            <Button
              key={type}
              variant={activeFilter === type ? "primary" : "outline"}
              size="small"
              onClick={() =>
                handleFilterChange(type as TransactionType | typeof ALL_FILTER)
              }
              className="focus:ring-0"
            >
              {type}
            </Button>
          ))}
        </div>
      </CardHeader>
      <TransactionTable
        paginatedTransactions={paginatedTransactions}
        requestSort={requestSort}
      />
      <CardContent>
        <div className="overflow-hidden rounded-md border"></div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}
