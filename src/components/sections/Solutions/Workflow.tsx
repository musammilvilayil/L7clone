import type { Solution } from "../../../data/services";
import { ArrowUpRight } from "../../common/Icons";
import "./Workflow.css";

/**
 * "Connected workflow" diagram: three nodes joined by animated connectors.
 * Decorative summary of the solution copy next to it, so it is aria-hidden.
 */
export function Workflow({ solution }: { solution: Solution }) {
  return (
    <div className="workflow" aria-hidden="true">
      <div className="workflow__top">
        <span className="workflow__live">Connected workflow</span>
        <span>Illustrative</span>
      </div>
      <div className="workflow__flow">
        {solution.flow.map((step, index) => (
          <div key={index} className="workflow__group">
            {index > 0 && (
              <div className="workflow__connector">
                <i />
              </div>
            )}
            <div className={index === 1 ? "workflow__node workflow__node--main" : "workflow__node"}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
              <small>{solution.flowLabels[index]}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="workflow__bottom">
        <span>Built around your next business goal</span>
        <ArrowUpRight />
      </div>
    </div>
  );
}
