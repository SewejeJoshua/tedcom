export function Logo({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sz =
    size === "sm"
      ? "size-7"
      : size === "lg"
      ? "size-12"
      : "size-9";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sz} rounded-xl bg-primary text-primary-foreground grid place-items-center ring-4 ring-primary/10 overflow-hidden`}
      >
        <img
          src="/tedlogo.jpg"
          alt="Tedcomm logo"
          className="w-full h-full object-contain"
        />
      </div>

      <span className="font-display font-bold tracking-tight text-lg lg:text-4xl">
        Tedcom
      </span>
    </div>
  );
}