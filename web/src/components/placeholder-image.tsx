import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaceholderImage({
  accent = "#ff5b04",
  className,
  label,
}: {
  accent?: string;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-2xl bg-muted",
        className,
      )}
      style={{ backgroundImage: `linear-gradient(135deg, ${accent}1f, transparent 62%)` }}
    >
      <ImageIcon className="size-8 text-muted-foreground/30" />
      {label && (
        <span className="absolute bottom-3 left-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
          {label}
        </span>
      )}
    </div>
  );
}
