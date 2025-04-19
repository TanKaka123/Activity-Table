"use client";

import ActivityTable from "./_components/ActivityTable";

const TransactionsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 dark:bg-gray-900 ">
      <div className="mx-auto max-w-6xl ">
        <h1 className="mb-8 text-3xl font-bold"> Recent Transactions</h1>
        <ActivityTable />
      </div>
    </main>
  );
};

export default TransactionsPage;
