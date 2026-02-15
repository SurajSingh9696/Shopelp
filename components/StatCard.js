export default function StatCard({ label, value, delta, tone = "emerald" }) {
  const toneStyles =
    tone === "ember"
      ? "bg-accent/10 text-accent"
      : "bg-primary/10 text-primary";

  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-foreground shadow-soft">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        {delta ? (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneStyles}`}>
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
