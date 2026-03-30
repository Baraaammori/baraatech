export default function PermissionDenied() {
  return (
    <div className="dash-card flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--magenta)]/10 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-[var(--magenta)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="font-[var(--font-display)] text-xl font-bold text-white mb-2">
        Access Denied
      </h2>
      <p className="text-[var(--gray-400)] max-w-sm">
        You do not have permission to view this section. Contact your administrator if you
        believe this is an error.
      </p>
      <a href="/dashboard" className="dash-btn dash-btn-secondary mt-6">
        Return to Dashboard
      </a>
    </div>
  );
}
