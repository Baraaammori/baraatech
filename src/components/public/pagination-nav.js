import Link from "next/link";

function buildPageHref(basePath, targetPage) {
  return `${basePath}?page=${targetPage}`;
}

export default function PaginationNav({ page, totalPages, basePath, lang }) {
  if (totalPages <= 1) return null;

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  const pageNumbers = [];

  for (let current = start; current <= end; current += 1) {
    pageNumbers.push(current);
  }

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={buildPageHref(basePath, Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
          page <= 1
            ? "pointer-events-none border-white/10 text-[var(--gray-600)]"
            : "border-[var(--cyan)]/40 text-[var(--cyan)] hover:bg-[var(--cyan)]/10"
        }`}
      >
        {lang === "ar" ? "السابق" : "Previous"}
      </Link>

      {pageNumbers.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={buildPageHref(basePath, pageNumber)}
          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
            pageNumber === page
              ? "border-[var(--lime)] bg-[var(--lime)]/10 text-[var(--lime)]"
              : "border-white/10 text-[var(--gray-300)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
          }`}
          aria-current={pageNumber === page ? "page" : undefined}
        >
          {pageNumber}
        </Link>
      ))}

      <Link
        href={buildPageHref(basePath, Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
          page >= totalPages
            ? "pointer-events-none border-white/10 text-[var(--gray-600)]"
            : "border-[var(--cyan)]/40 text-[var(--cyan)] hover:bg-[var(--cyan)]/10"
        }`}
      >
        {lang === "ar" ? "التالي" : "Next"}
      </Link>
    </nav>
  );
}
