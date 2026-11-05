import { Fragment } from "react";

/**
 * Renders copy that contains "\n" design line breaks. The breaks use the
 * `.br-desktop` class, so headings re-flow naturally on phones (the design
 * hides these <br>s below 700px).
 *
 * `accent` appends the red full stop that ends most Ladder7 headings.
 */
export function Lines({ text, accent = false }: { text: string; accent?: boolean }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <>
              {" "}
              <br className="br-desktop" />
            </>
          )}
          {part}
        </Fragment>
      ))}
      {accent && <span className="accent">.</span>}
    </>
  );
}
