import { useCallback, useRef, type KeyboardEvent } from "react";

/**
 * WAI-ARIA tabs keyboard model (automatic activation): arrow keys move and
 * select, Home/End jump to the ends, only the selected tab is in the tab
 * order. Used by the product suite, solutions and delivery-pathway tabs.
 */
export function useRovingTabs({
  count,
  selected,
  onSelect,
  orientation = "horizontal",
}: {
  count: number;
  selected: number;
  onSelect: (index: number, fromKeyboard: boolean) => void;
  orientation?: "horizontal" | "vertical" | "both";
}) {
  const tabs = useRef<(HTMLElement | null)[]>([]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>, index: number) => {
      const forward = orientation === "vertical" ? ["ArrowDown"] : orientation === "both" ? ["ArrowDown", "ArrowRight"] : ["ArrowRight"];
      const back = orientation === "vertical" ? ["ArrowUp"] : orientation === "both" ? ["ArrowUp", "ArrowLeft"] : ["ArrowLeft"];
      let next: number | undefined;
      if (forward.includes(event.key)) next = (index + 1) % count;
      else if (back.includes(event.key)) next = (index - 1 + count) % count;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = count - 1;
      if (next === undefined) return;
      event.preventDefault();
      onSelect(next, true);
      tabs.current[next]?.focus({ preventScroll: true });
    },
    [count, onSelect, orientation],
  );

  const getTabProps = (index: number) => ({
    role: "tab" as const,
    "aria-selected": index === selected,
    tabIndex: index === selected ? 0 : -1,
    ref: (el: HTMLElement | null) => {
      tabs.current[index] = el;
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => onKeyDown(event, index),
    onClick: () => onSelect(index, false),
  });

  return { getTabProps, tabs };
}
