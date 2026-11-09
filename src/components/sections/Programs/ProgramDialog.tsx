import { useEffect, useRef, type MouseEvent } from "react";
import type { Program } from "../../../data/education";
import { Close } from "../../common/Icons";
import { ResponsiveImage } from "../../common/ResponsiveImage";
import { Button } from "../../ui/Button";
import "./ProgramDialog.css";

/**
 * Program detail modal (native <dialog>):
 * Horizontal 2-column layout on desktop with expanded width,
 * rich skill highlights, image preview, and an "Talk to an advisor" action.
 */
export function ProgramDialog({
  program,
  onClose,
  onApply,
}: {
  program: Program | null;
  onClose: () => void;
  onApply: (program: Program) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (program && !dialog.open) dialog.showModal();
    else if (!program && dialog.open) dialog.close();
  }, [program]);

  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside) onClose();
  };

  return (
    <dialog
      ref={ref}
      className="program-dialog"
      aria-labelledby="program-dialog-title"
      onClose={onClose}
      onClick={onDialogClick}
    >
      {program && (
        <div className="program-dialog__inner">
          <button
            type="button"
            className="program-dialog__close"
            aria-label="Close program details"
            onClick={onClose}
          >
            <Close />
          </button>

          <div className="program-dialog__grid">
            {/* Left column: Core details & CTA */}
            <div className="program-dialog__main">
              <p className="program-dialog__eyebrow">
                <span className="program-dialog__dot" aria-hidden="true" />
                <span>
                  {program.duration} · {program.format}
                </span>
              </p>

              <h2 id="program-dialog-title" className="program-dialog__title">
                {program.name}
              </h2>

              <p className="program-dialog__description">{program.description}</p>

              {program.label && (
                <div className="program-dialog__focus">
                  <span className="program-dialog__focus-label">Core stack:</span>
                  <span className="program-dialog__focus-tags">
                    {program.label.split("/").map((tag) => (
                      <span key={tag.trim()} className="program-dialog__tag">
                        {tag.trim()}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              <div className="program-dialog__cta">
                <Button onClick={() => onApply(program)}>Talk to an advisor</Button>
              </div>
            </div>

            {/* Right column: Image preview & skills card */}
            <div className="program-dialog__aside">
              <div className="program-dialog__media">
                <ResponsiveImage
                  name={program.image}
                  alt={program.imageAlt}
                  sizes="(max-width: 768px) 90vw, 420px"
                />
              </div>

              <div className="program-dialog__card">
                <h3 className="program-dialog__card-title">What you'll explore</h3>
                <ul className="program-dialog__skills">
                  {program.skills.map((skill) => (
                    <li key={skill} className="program-dialog__skill-item">
                      <svg
                        className="program-dialog__check-icon"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M13.25 4.75L6 12L2.75 8.75"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
