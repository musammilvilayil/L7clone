import { useEffect, useRef, type MouseEvent } from "react";
import type { Program } from "../../../data/education";
import { Close } from "../../common/Icons";
import { Button } from "../../ui/Button";
import "./ProgramDialog.css";

/**
 * Program detail modal (native <dialog>): duration/format, full description
 * and the skills list, plus an "Talk to an advisor" button that hands off to
 * ContactSection's own form (see ProgramsSection's `applyFromDialog`).
 */
export function ProgramDialog({ program, onClose, onApply }: { program: Program | null; onClose: () => void; onApply: (program: Program) => void }) {
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
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) onClose();
  };

  return (
    <dialog ref={ref} className="program-dialog" aria-labelledby="program-dialog-title" onClose={onClose} onClick={onDialogClick}>
      {program && (
        <>
          <button type="button" className="program-dialog__close" aria-label="Close program details" onClick={onClose}>
            <Close />
          </button>
          <p className="eyebrow">
            {program.duration} · {program.format}
          </p>
          <h2 id="program-dialog-title">{program.name}</h2>
          <p>{program.description}</p>
          <h3>What you'll explore</h3>
          <ul>
            {program.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <Button onClick={() => onApply(program)}>Talk to an advisor</Button>
        </>
      )}
    </dialog>
  );
}
