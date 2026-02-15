export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
      <p className="max-w-2xl text-base text-muted">{description}</p>
    </div>
  );
}
