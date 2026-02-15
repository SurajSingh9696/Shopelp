export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-2xl border border-border bg-card/50 p-6">
      <div className="h-4 w-1/2 rounded bg-card/80" />
      <div className="h-3 w-full rounded bg-card/80" />
      <div className="h-3 w-5/6 rounded bg-card/80" />
    </div>
  );
}
