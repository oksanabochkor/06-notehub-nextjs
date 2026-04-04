"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div>
      <button onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}
