import { useEffect, useState } from "react";
import { ABOUT_REACH_CONTENT } from "../../../data/aboutReachContent";
import { revealRef } from "../../../hooks/useReveal";
import { WorldMap } from "./WorldMap";
import "./AboutReach.css";

const KERALA_TIME = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });

const TOOLS = ["Adobe AEM", "React", "Python", "Azure", "Shopify", "MongoDB"];

/** "Local attention. Connected thinking." (design: .about-reach) — Kerala map + tools. */
export function AboutReach() {
  const [time, setTime] = useState<string | null>(null);
  const content = ABOUT_REACH_CONTENT;
  const headingLines = (content?.section_heading ?? "Local attention.\nConnected thinking.").split("\n");

  useEffect(() => {
    const tick = () => setTime(KERALA_TIME.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="about-reach" aria-labelledby="reach-title">
      <div className="about-reach__top">
        <div className="reveal" ref={revealRef}>
          <p className="eyebrow eyebrow--live">
            {content?.content?.find((item: { type: string; text?: string }) => item.type === "p")?.text ?? "From Kerala. For your next chapter."}
          </p>
          <h2 id="reach-title">
            {headingLines.map((line: string, index: number) => (
              <span key={line}>
                {index > 0 && <br />}
                {line.replace(/\.$/, "")}
                {index === headingLines.length - 1 && <span className="accent">.</span>}
              </span>
            ))}
          </h2>
        </div>
        <dl className="reveal" ref={revealRef}>
          <div>
            <dt>Our bases</dt>
            <dd>2</dd>
          </div>
          <div>
            <dt>Local time · IST</dt>
            <dd>
              <time>{time ?? "--:--"}</time>
            </dd>
          </div>
        </dl>
      </div>

      <WorldMap />
      <div className="about-reach__map-key">
        <span>
          <strong>Cochin</strong> · WEE SPACES
        </span>
        <span>
          <strong>Trivandrum</strong> · Kinfra Film and IT Park
        </span>
      </div>

      <div className="about-reach__tools" aria-label="Technologies in our work">
        {TOOLS.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </section>
  );
}
