import { cn } from "../../utils/cn";

/** Pill-shaped keyword tags rendered as a list (semantic for screen readers). */
export function TagList({ tags, className, label }: { tags: string[]; className?: string; label?: string }) {
  return (
    <ul className={cn("tag-list", className)} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}
