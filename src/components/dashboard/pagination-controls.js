"use client";

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  itemLabel = "items",
}) {
  if (totalPages <= 1) return null;

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  const pages = [];

  for (let current = start; current <= end; current += 1) {
    pages.push(current);
  }

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(totalItems, page * pageSize);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
      <p className="text-xs text-[var(--gray-500)]">
        Showing {from}-{to} of {totalItems} {itemLabel}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="dash-btn dash-btn-ghost disabled:opacity-40"
        >
          Previous
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={pageNumber === page ? "dash-btn dash-btn-primary" : "dash-btn dash-btn-ghost"}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="dash-btn dash-btn-ghost disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
