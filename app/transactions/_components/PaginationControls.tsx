"use client";
import Button from "@/app/components/Button";
import { Dispatch, SetStateAction } from "react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
};

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex space-x-2">
        <Button
          size="small"
          onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            size="small"
            variant={currentPage === i + 1 ? "primary" : "outline"}
            onClick={() => onPageChange(i + 1)}
            className="focus:ring-0"
          >
            {i + 1}
          </Button>
        ))}
        <Button
          size="small"
          onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
