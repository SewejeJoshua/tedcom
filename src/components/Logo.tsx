export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sz = size === "sm" ? "size-7 text-sm" : size === "lg" ? "size-12 text-2xl" : "size-9 text-base";
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sz} rounded-xl bg-primary text-primary-foreground font-bold grid place-items-center ring-4 ring-primary/10 font-display`}
      >
        A
      </div>
      <span className="font-display font-bold tracking-tight text-lg">AMANI</span>
    </div>
  );
}
