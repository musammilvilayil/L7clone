import type { JSX } from "react";
import type { ProductArt as ArtKind } from "../../../data/products";

/**
 * Illustrative product "screens" from the design (decorative; the whole art
 * block is aria-hidden and labelled PRODUCT CONCEPT / ILLUSTRATIVE).
 */

function WindowBar({ title }: { title: string }) {
  return (
    <div className="art-window__bar">
      <span>
        <i />
        <i />
        <i />
      </span>
      <b>{title}</b>
      <em>↗</em>
    </div>
  );
}

function Audit() {
  return (
    <div className="art-window art-window--audit">
      <WindowBar title="Site 360 / Website overview" />
      <div className="art-audit">
        <div className="art-audit__dial">
          <div className="art-audit__ring" />
          <strong>
            360<span>Every angle, connected</span>
          </strong>
          <i />
        </div>
        <div className="art-audit__signals">
          {[
            ["↗", "Performance", "01"],
            ["◈", "Accessibility", "02"],
            ["⌕", "Search", "03"],
            ["◇", "Security", "04"],
          ].map(([glyph, label, n]) => (
            <span key={label}>
              <i>{glyph}</i> {label} <b>{n}</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Nexus() {
  return (
    <div className="art-nexus">
      <svg viewBox="0 0 640 290" fill="none">
        <path d="M320 145 130 62M320 145 510 62M320 145 130 228M320 145 510 228" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="320" cy="145" r="77" stroke="currentColor" opacity=".16" />
        <circle cx="320" cy="145" r="102" stroke="currentColor" opacity=".08" />
      </svg>
      <div className="art-nexus__core">
        L7<span>Nexus</span>
      </div>
      <span className="art-nexus__node art-nexus__node--1">Company context</span>
      <span className="art-nexus__node art-nexus__node--2">Knowledge</span>
      <span className="art-nexus__node art-nexus__node--3">Questions</span>
      <span className="art-nexus__node art-nexus__node--4">Decisions</span>
    </div>
  );
}

function Outreach() {
  return (
    <div className="art-outreach">
      <div className="art-outreach__card">
        <span>01 / Research</span>
        <i>◎</i>
        <b>A relevant prospect</b>
        <div className="art-line" />
        <div className="art-line art-line--short" />
      </div>
      <span className="art-outreach__connector">→</span>
      <div className="art-outreach__card art-outreach__card--draft">
        <span>02 / Your review</span>
        <div className="art-outreach__letter">↗</div>
        <b>A thoughtful first message</b>
        <div className="art-line" />
        <div className="art-line art-line--short" />
        <em>
          <i /> Ready for your review
        </em>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="art-data">
      <div className="art-data__sources">
        <span>
          Platforms <i>↗</i>
        </span>
        <span>
          Business systems <i>↗</i>
        </span>
        <span>
          Data sources <i>↗</i>
        </span>
      </div>
      <svg viewBox="0 0 130 200" fill="none">
        <path d="M0 30H30Q60 30 60 100H130M0 100H130M0 170H30Q60 170 60 100" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="4" fill="currentColor" />
      </svg>
      <div className="art-data__destination">
        <i>▥</i>
        <b>L7 Insights</b>
        <span>A joined-up view</span>
        <div className="art-data__bars">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function Marketing() {
  return (
    <div className="art-window art-window--marketing">
      <WindowBar title="Infinite Insights / Channel view" />
      <div className="art-marketing">
        <div className="art-marketing__key">
          <span>
            <i />
            Advertising
          </span>
          <span>
            <i />
            Analytics
          </span>
        </div>
        <svg viewBox="0 0 600 185" fill="none">
          <path d="M0 40H600M0 95H600M0 150H600" stroke="#dce1e1" strokeDasharray="4 6" />
          <path d="M0 155C45 155 50 100 110 110S180 140 230 90 300 130 355 65 430 75 480 50 550 55 600 15" stroke="#f31b40" strokeWidth="3" />
          <path d="M0 170C70 170 75 135 140 145S220 105 280 120 370 95 420 100 510 65 600 60" stroke="#75888d" strokeWidth="2" />
        </svg>
        <div className="art-marketing__footer">
          <span>Advertising data</span>
          <span>Shared perspective</span>
          <span>Analytics data</span>
        </div>
      </div>
    </div>
  );
}

const ART: Record<ArtKind, () => JSX.Element> = {
  audit: Audit,
  nexus: Nexus,
  outreach: Outreach,
  data: Data,
  marketing: Marketing,
};

export function ProductArt({ kind }: { kind: ArtKind }) {
  const Art = ART[kind];
  return <Art />;
}
