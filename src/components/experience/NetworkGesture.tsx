import { useEffect, useRef } from 'react';

/**
 * Every gesture owns a real illustration dock in its section.
 * No fixed canvas, no globally persistent random-line background, and no content overlap.
 */
export type GestureVariant =
  | 'hero' | 'thinking' | 'about'
  | 'digital' | 'automation' | 'strategy' | 'development'
  | 'products' | 'why' | 'faq' | 'contact';

type Stroke = {
  id: string;
  d: string;
  stage?: number;
  secondary?: boolean;
};

type Config = { rotation: number; scale: number; offsetX: number; offsetY: number; node?: [number, number] };

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const ease = (a: number, b: number, t: number) => {
  const x = clamp((t - a) / Math.max(.0001, b - a));
  return x * x * (3 - 2 * x);
};

/** Eight sequential groups for the front-facing, five-finger FAQ illustration. */
const OPEN_HAND: Stroke[] = [
  { id: 'wrist-left', stage: 0, d: 'M107 317 C109 298 109 284 104 262 C101 251 94 234 89 219' },
  { id: 'wrist-right', stage: 0, d: 'M225 316 C226 294 228 272 234 253 C241 233 250 222 253 206' },
  { id: 'palm-bottom', stage: 1, d: 'M107 317 C145 326 191 328 225 316' },
  { id: 'palm-left', stage: 1, d: 'M89 219 C105 205 115 190 123 176' },
  { id: 'palm-right', stage: 1, d: 'M213 177 C233 192 242 201 253 206' },
  { id: 'thumb', stage: 2, d: 'M89 219 C80 207 67 196 47 188 C29 180 24 166 32 156 C41 145 55 147 67 156 L118 197' },
  { id: 'index', stage: 3, d: 'M123 176 C119 153 116 119 117 100 C117 82 125 74 136 76 C147 78 149 87 149 102 L151 176' },
  { id: 'middle', stage: 4, d: 'M151 176 C150 139 150 85 152 68 C153 51 162 44 173 46 C186 49 188 60 187 76 L183 176' },
  { id: 'ring', stage: 5, d: 'M183 176 C187 140 194 104 197 91 C201 77 210 74 220 80 C231 86 232 99 227 112 L213 177' },
  { id: 'little', stage: 6, d: 'M213 177 C225 154 235 135 246 131 C257 126 267 134 267 146 C268 157 261 170 253 206' },
  { id: 'palm-arch', stage: 7, secondary: true, d: 'M111 209 C138 194 178 191 216 203' },
  { id: 'palm-crease', stage: 7, secondary: true, d: 'M111 230 C140 219 177 222 209 236' },
  { id: 'palm-contour', stage: 7, secondary: true, d: 'M119 261 C150 250 190 258 218 268' },
  { id: 'lifeline', stage: 7, secondary: true, d: 'M119 199 C135 225 141 240 146 264 C149 279 151 291 158 300' },
  { id: 'knuckle-bridges', stage: 7, secondary: true, d: 'M133 191 Q147 185 162 189 Q177 183 192 191 Q203 191 214 196' },
  { id: 'longitude-one', stage: 7, secondary: true, d: 'M136 204 C137 231 137 264 143 303' },
  { id: 'longitude-two', stage: 7, secondary: true, d: 'M166 196 C165 232 171 267 175 312' },
  { id: 'longitude-three', stage: 7, secondary: true, d: 'M194 202 C190 235 200 263 202 304' },
  { id: 'index-joint', stage: 7, secondary: true, d: 'M119 136 Q135 141 149 137' },
  { id: 'middle-joint', stage: 7, secondary: true, d: 'M151 119 Q168 125 185 120' },
  { id: 'ring-joint', stage: 7, secondary: true, d: 'M193 133 Q208 143 223 136' },
  { id: 'little-joint', stage: 7, secondary: true, d: 'M229 160 Q244 169 260 163' },
  // Anatomical volume: dorsal ridges and layered joint contours stay inside
  // the finger silhouettes, never extending random wires into the background.
  { id: 'thumb-ridge', stage: 7, secondary: true, d: 'M43 166 C53 164 75 180 96 205' },
  { id: 'index-ridge', stage: 7, secondary: true, d: 'M135 91 C133 112 135 145 139 178' },
  { id: 'middle-ridge', stage: 7, secondary: true, d: 'M170 63 C168 99 169 139 169 178' },
  { id: 'ring-ridge', stage: 7, secondary: true, d: 'M213 97 C207 120 201 156 199 185' },
  { id: 'little-ridge', stage: 7, secondary: true, d: 'M254 147 C244 159 236 184 228 199' },
  { id: 'index-distal', stage: 7, secondary: true, d: 'M121 109 Q135 117 146 110' },
  { id: 'middle-distal', stage: 7, secondary: true, d: 'M155 84 Q170 91 183 85' },
  { id: 'ring-distal', stage: 7, secondary: true, d: 'M198 118 Q212 125 225 120' },
  { id: 'volar-arch', stage: 7, secondary: true, d: 'M103 224 C111 241 118 251 123 277 C148 285 178 287 209 277' },
  { id: 'wrist-core', stage: 7, secondary: true, d: 'M129 296 Q165 310 206 299' },
];

/** Purpose-built silhouettes, not 10 rotations of the same open hand. */
const POINT_HAND: Stroke[] = [
  { id:'index', d:'M143 285 C133 272 128 256 127 239 L124 105 C123 80 130 68 143 68 C159 68 167 80 167 102 L169 193' },
  { id:'knuckles', d:'M169 193 C177 169 198 165 208 180 C215 168 233 167 244 178 C254 189 252 204 251 212' },
  { id:'outside', d:'M251 212 C259 225 256 246 246 264 L239 310' },
  { id:'wrist', d:'M143 285 C163 305 199 315 239 310' },
  { id:'thumb', d:'M133 231 C113 211 89 196 75 203 C61 212 65 227 78 238 C97 253 110 272 143 285' },
  { id:'folds-1', secondary:true, d:'M173 201 C185 214 194 218 209 217 M210 190 C220 204 232 208 246 206' },
  { id:'folds-2', secondary:true, d:'M157 267 C182 275 214 276 243 260 M160 294 C187 295 209 298 237 294' },
  { id:'index-joints', secondary:true, d:'M126 152 C140 161 151 159 169 153 M128 122 C142 129 154 128 167 121' },
  { id:'mesh', secondary:true, d:'M158 238 C184 242 209 246 251 239 M173 214 L189 267 L206 224 L220 270 L240 225' },
];
const PINCH_HAND: Stroke[] = [
  { id:'wrist-left',d:'M125 318 C119 299 108 270 110 254' },
  { id:'index',d:'M110 254 C98 224 96 190 117 165 C133 146 153 129 180 122 C201 118 207 126 207 138 C207 150 199 157 179 159 C165 162 154 170 150 185' },
  { id:'thumb',d:'M150 185 C166 195 181 205 190 215 C202 226 197 242 183 245 C167 248 150 236 137 225' },
  { id:'fingers',d:'M183 245 C202 224 223 205 240 208 C254 211 257 226 247 236 L227 257 C246 243 261 249 265 260 C269 272 255 282 245 288 L228 315' },
  { id:'wrist-right',d:'M228 315 C193 321 157 324 125 318' },
  { id:'pinch-folds',secondary:true,d:'M124 268 C151 276 181 281 215 272 M139 295 C167 303 194 302 227 299 M145 200 Q161 211 172 218' },
  { id:'knuckle-net',secondary:true,d:'M137 227 L157 250 L187 244 L208 262 L237 239 M156 251 L173 287 L208 262' },
];
const THINK_HAND: Stroke[] = [
  // Hand under chin: the index is folded and meets the profile at the jaw.
  // There is deliberately no upright lone digit or V-sign silhouette.
  { id:'wrist-left', d:'M91 336 C94 303 102 283 126 266' },
  { id:'support-index', d:'M126 266 C124 239 135 221 157 214 C175 207 195 202 212 190 C229 177 243 176 249 187 C255 198 247 208 232 219 L203 242' },
  { id:'folded-middle', d:'M203 242 C224 219 239 219 247 229 C255 240 247 253 233 262 L212 276' },
  { id:'folded-ring', d:'M212 276 C227 264 240 268 243 281 C245 292 233 302 217 304' },
  { id:'folded-little', d:'M217 304 C225 320 217 333 207 339' },
  { id:'wrist-right', d:'M207 339 C168 347 129 350 91 336' },
  { id:'thumb-under-chin', d:'M126 266 C137 252 152 250 162 258 C174 268 184 275 199 281' },
  // Minimal human profile gives the hand a thoughtful purpose, and stays
  // inside the same reserved gesture dock (not across heading typography).
  { id:'profile-contour', secondary:true, d:'M274 62 C300 67 308 93 307 111 C306 129 295 145 289 158 C291 167 301 174 298 181 C292 190 281 190 275 192 C273 203 268 213 254 219 C240 222 234 221 232 219' },
  { id:'profile-neck', secondary:true, d:'M269 220 C281 244 278 262 272 276' },
  { id:'profile-eye', secondary:true, d:'M279 164 C285 161 292 160 297 161' },
  { id:'palm-crease', secondary:true, d:'M131 281 C153 278 179 282 211 297 M139 308 Q171 310 211 323' },
  { id:'knuckle-mesh', secondary:true, d:'M153 214 Q166 239 172 280 M193 209 Q204 240 215 270' },
];
const BUILD_HAND: Stroke[] = [
  { id:'wrist',d:'M90 310 C94 286 101 267 111 258 C124 245 141 241 164 244' },
  { id:'extended-index',d:'M164 244 C179 226 208 203 233 182 C246 171 261 173 268 184 C275 195 270 205 256 216 L208 258' },
  { id:'middle',d:'M208 258 C227 244 245 243 254 252 C264 263 260 275 247 284 L223 303' },
  { id:'outer',d:'M223 303 C194 317 147 323 90 310' },
  { id:'thumb',d:'M111 258 C104 234 99 206 111 197 C120 190 131 193 138 203 L164 244' },
  { id:'mesh',secondary:true,d:'M118 280 L161 261 L189 292 L218 269 M138 203 L161 261 M153 307 L189 292 L209 303' },
  { id:'crease',secondary:true,d:'M111 293 Q155 303 209 289' },
];
const WELCOME_HAND: Stroke[] = [
  { id:'wrist-left', d:'M119 316 C113 291 103 269 98 249' },
  { id:'wrist-right', d:'M237 314 C231 290 235 270 242 247' },
  { id:'palm-edge', d:'M98 249 C83 236 68 229 55 217 C42 205 45 192 56 187 C67 182 80 189 92 197 L122 219' },
  { id:'index', d:'M122 219 C119 193 109 167 106 144 C103 127 110 118 121 118 C133 118 139 127 140 145 L148 200' },
  { id:'middle', d:'M148 200 C141 170 133 131 134 113 C135 97 144 88 155 91 C168 95 171 107 172 120 L178 199' },
  { id:'ring', d:'M178 199 C180 168 182 139 186 125 C191 111 203 107 211 116 C220 126 218 139 215 151 L206 211' },
  { id:'little', d:'M206 211 C224 190 234 180 245 178 C258 178 266 189 261 201 L242 247' },
  { id:'palm-base', d:'M98 249 C115 288 133 306 161 317 C187 326 216 322 237 314' },
  { id:'mesh-one', secondary:true, d:'M118 240 Q161 222 217 241 M128 264 Q174 252 229 260 M151 288 Q188 284 224 281' },
  { id:'mesh-two', secondary:true, d:'M137 222 C138 246 148 278 161 312 M174 215 C179 239 185 278 190 314 M202 228 L210 260 L219 290' },
];
const HANDS: Record<Exclude<GestureVariant, 'contact'>, Stroke[]> = {
  hero: OPEN_HAND, thinking: THINK_HAND, about: WELCOME_HAND, digital: BUILD_HAND,
  automation: POINT_HAND, strategy: THINK_HAND, development: PINCH_HAND,
  products: POINT_HAND, why: OPEN_HAND, faq: OPEN_HAND,
};
const POSITION: Record<Exclude<GestureVariant, 'contact'>, Config> = {
  hero: { rotation: -9, scale: .94, offsetX: 8, offsetY: 0 },
  thinking: { rotation: 3, scale: 1.08, offsetX: 0, offsetY: -7 },
  about: { rotation: -25, scale: .95, offsetX: -7, offsetY: 13, node:[268,182] },
  digital: { rotation: 13, scale: 1, offsetX: 5, offsetY: 0, node:[268,182] },
  automation: { rotation: -18, scale: .99, offsetX: 0, offsetY: 0, node:[144,62] },
  strategy: { rotation: 12, scale: 1, offsetX: 0, offsetY: 0 },
  development: { rotation: -14, scale: 1, offsetX: 0, offsetY: 2, node:[192,142] },
  products: { rotation: 57, scale: .93, offsetX: 12, offsetY: -9, node:[144,62] },
  why: { rotation: 24, scale: .95, offsetX: -9, offsetY: 4 },
  faq: { rotation: 0, scale: .93, offsetX: 0, offsetY: 30 },
};


/**
 * An SVG rig with scroll-scrubbed formation, articulation, interaction, and departure.
 * All per-frame updates happen on SVG nodes, not in React render/state.
 */
function WireHand({ gesture }: { gesture: Exclude<GestureVariant, 'contact'> }) {
  const lines = HANDS[gesture];
  const setting = POSITION[gesture];
  const isFaq = gesture === 'faq';
  const openPalm = gesture === 'hero' || gesture === 'faq' || gesture === 'why' || gesture === 'about';
  return (
    <g data-gesture-body="" data-kind={gesture}>
      <g data-hand-rig=""
        transform={'translate(' + setting.offsetX + ' ' + setting.offsetY + ') translate(180 180) rotate(' + setting.rotation + ') scale(' + setting.scale + ') translate(-180 -180)'}
        fill="none" strokeLinecap="round" strokeLinejoin="round">
        {lines.map((line, index) => (
          <g key={line.id} data-stroke={line.id} data-stage={isFaq ? (line.stage ?? 7) : (line.secondary ? 2 : index < 2 ? 0 : 1)}
            data-articulate={openPalm && ['thumb','index','middle','ring','little'].includes(line.id) ? line.id : undefined}
            data-secondary={line.secondary ? 'true' : undefined}>
            <path d={line.d} stroke="var(--gesture-depth,#1b528a)" strokeWidth={line.secondary ? 1.7 : 4.3}
              transform="translate(5 6)" opacity={line.secondary ? .18 : .40} pathLength={1}
              strokeDasharray="1" strokeDashoffset="0"/>
            <path d={line.d} stroke={line.secondary ? 'var(--gesture-inner,#68a5d3)' : 'var(--gesture-stroke,#a7dcff)'}
              strokeWidth={line.secondary ? 1.15 : 2.35} opacity={line.secondary ? .68 : 1}
              pathLength={1} strokeDasharray="1" strokeDashoffset="0"/>
          </g>
        ))}
        {/* The two nodes belong to the services hand, not to the scene background. */}
        {['digital','automation','strategy','development'].includes(gesture) && (
          <g data-gesture-action="" opacity="0" stroke="var(--gesture-stroke,#a7dcff)" fill="none">
            <path data-action-wire="" d={'M' + ((setting.node?.[0] ?? 218) - 43) + ' ' + (setting.node?.[1] ?? 176) +
              ' Q' + ((setting.node?.[0] ?? 218) - 17) + ' ' + ((setting.node?.[1] ?? 176) - 34) +
              ' ' + (setting.node?.[0] ?? 218) + ' ' + (setting.node?.[1] ?? 176)}
              strokeWidth="1.5" pathLength={1} strokeDasharray="1" strokeDashoffset="0"/>
            <circle cx={(setting.node?.[0] ?? 218) - 43} cy={setting.node?.[1] ?? 176} r="7" strokeWidth="1.2"/>
            <circle cx={setting.node?.[0] ?? 218} cy={setting.node?.[1] ?? 176} r="7" strokeWidth="1.2"/>
            <circle data-touch-point="" cx={setting.node?.[0] ?? 218} cy={setting.node?.[1] ?? 176} r="2.9" fill="var(--gesture-stroke,#a7dcff)" stroke="none"/>
          </g>
        )}
        {gesture === 'products' && (
          <g data-product-action="" opacity="0" stroke="var(--gesture-stroke,#a7dcff)" fill="none">
            <circle cx="144" cy="62" r="16" strokeWidth="1.2" strokeDasharray="3 5"/>
            <circle cx="144" cy="62" r="6" strokeWidth="1.5"/>
            <path d="M144 27 V40 M144 84 V97" strokeWidth="1.2"/>
          </g>
        )}
      </g>
      {isFaq && (
        <g data-question="" stroke="var(--gesture-stroke,#a7dcff)" strokeWidth="2.15" fill="none"
          strokeLinecap="round" strokeLinejoin="round">
          <path data-question-path="" d="M269 65 C253 43 257 22 278 17 C299 12 312 31 300 49 L289 62 L289 71"
            pathLength={1} strokeDasharray="1" strokeDashoffset="0"/>
          <circle data-question-dot="" cx="289" cy="82" r="2.7" fill="var(--gesture-stroke,#a7dcff)" stroke="none"/>
        </g>
      )}
    </g>
  );
}

/** The same two anatomically distinct reaching hands approach the contact point from either side. */
const REACH_STROKES = [
  'M12 216 C76 214 122 210 169 204 C200 200 217 189 240 184 C274 176 315 162 347 161 C359 161 364 166 364 174 C364 181 355 186 343 188 L307 195',
  'M307 195 C291 199 275 205 262 210',
  'M262 210 C277 214 285 221 283 230 C281 239 271 242 256 240',
  'M256 240 C272 248 275 258 266 266 C258 273 244 269 232 263',
  'M232 263 C243 275 240 286 228 290 C217 293 204 287 194 282',
  'M194 282 C158 284 126 282 92 281 C62 281 35 281 12 282',
  'M169 204 C183 216 195 224 212 231 C223 235 233 233 238 227',
];
const REACH_CONTOURS = [
  'M124 210 C143 234 147 262 152 280',
  'M162 205 C174 227 180 256 184 282',
  'M198 191 C211 212 220 243 226 287',
  'M153 227 Q201 221 263 213',
  'M160 247 Q201 243 254 241',
  'M166 270 Q195 267 233 264',
];

function PairHands() {
  return (
    <g data-contact-scene="" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[false,true].map(right => (
        <g key={right ? 'right-hand' : 'left-hand'} data-reach={right ? 'right' : 'left'}
          transform={right ? 'translate(760 0) scale(-1 1)' : 'translate(0 0)'}>
          {REACH_STROKES.map((d,i) => (
            <g key={i} data-reach-stroke="" data-reach-stage={i < 2 ? 0 : i < 6 ? 1 : 2}>
              <path d={d} stroke="var(--gesture-depth,#1b528a)" strokeWidth="4"
                transform="translate(0 4)" opacity=".43" pathLength={1}
                strokeDasharray="1" strokeDashoffset="0"/>
              <path d={d} stroke="var(--gesture-stroke,#a7dcff)" strokeWidth="2.25"
                pathLength={1} strokeDasharray="1" strokeDashoffset="0"/>
            </g>
          ))}
          {REACH_CONTOURS.map((d,i) => (
            <path key={i} data-reach-contour="" d={d} stroke="var(--gesture-inner,#68a5d3)"
              strokeWidth="1" opacity=".62" pathLength={1} strokeDasharray="1" strokeDashoffset="0"/>
          ))}
        </g>
      ))}
      <g data-contact-connection="" opacity="0" stroke="var(--gesture-stroke,#a7dcff)" strokeWidth="1.4">
        <path d="M364 173 Q380 162 396 173" fill="none" data-connection-wire=""
          pathLength={1} strokeDasharray="1" strokeDashoffset="0"/>
        <circle cx="380" cy="168" r="9" fill="none"/>
        <circle cx="380" cy="168" r="3.1" fill="var(--gesture-stroke,#a7dcff)" stroke="none"/>
      </g>
    </g>
  );
}

const ARTICULATION_PIVOTS: Record<string, [number,number,number]> = {
  thumb: [92, 207, -23],
  index: [133, 175, -13],
  middle: [167, 177, -6],
  ring: [198, 179, 8],
  little: [239, 185, 17],
};

function paintPaths(group: Element, completion: number) {
  const value = String(1 - clamp(completion));
  group.querySelectorAll<SVGPathElement>('path[pathLength="1"]').forEach(path => {
    path.style.strokeDashoffset = value;
  });
}

/**
 * Progress is derived from the dock's viewport intersection. Only active docks
 * read layout and only SVG attributes/styles are mutated, so there are zero
 * scroll-driven React re-renders.
 */
export function NetworkGesture({ gesture, className = '' }: { gesture: GestureVariant; className?: string }) {
  const dock = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = dock.current;
    if (!root) return;
    const mount: HTMLDivElement = root;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 550px)');
    const network = navigator as Navigator & { connection?: { saveData?: boolean }, deviceMemory?: number };
    const simplified = () => mobile.matches || network.connection?.saveData === true || (network.deviceMemory !== undefined && network.deviceMemory <= 2);
    const body = root.querySelector<SVGGElement>('[data-gesture-body]');
    const rig = root.querySelector<SVGGElement>('[data-hand-rig]');
    const reach = root.querySelectorAll<SVGGElement>('[data-reach]');
    const bodyLines = root.querySelectorAll<SVGGElement>('[data-stroke]');
    const reachLines = root.querySelectorAll<SVGGElement>('[data-reach-stroke]');
    const contourLines = root.querySelectorAll<SVGPathElement>('[data-reach-contour]');
    const question = root.querySelector<SVGGElement>('[data-question]');
    const action = root.querySelector<SVGGElement>('[data-gesture-action]');
    const productAction = root.querySelector<SVGGElement>('[data-product-action]');
    const connection = root.querySelector<SVGGElement>('[data-contact-connection]');
    const setting = gesture === 'contact' ? null : POSITION[gesture];
    const isHero = gesture === 'hero';
    const isFaq = gesture === 'faq';
    let raf = 0;
    let active = false;
    let lastValue = -1;

    function render(progress: number, reduced: boolean) {
      // Hero must be recognizable immediately, even before any scroll.
      const p = reduced ? .70 : progress;
      const arrival = reduced ? 1 : ease(isHero ? -.10 : .00, isHero ? .23 : .23, p);
      const actionPhase = reduced ? 1 : ease(.31, .76, p);
      const departure = reduced ? 1 : 1 - ease(.89, 1, p);
      const breathe = reduced ? 0 : Math.sin(Math.PI * ease(.18,.88,p));
      mount.dataset.phase = reduced ? 'rest' : p < .33 ? 'form' : p < .82 ? 'act' : 'release';
      mount.dataset.progress = p.toFixed(3);
      const opacity = arrival * departure;
      if (body) body.style.opacity = opacity.toFixed(3);
      if (setting && rig) {
        const fromLeft = gesture === 'about' ? -42 : gesture === 'thinking' ? 25 : 0;
        const fromRight = isHero ? 22 : gesture === 'products' ? 35 : 0;
        const horizontal = (fromLeft + fromRight) * (1 - arrival) + (gesture === 'products' ? -13 : gesture === 'digital' || gesture === 'automation' ? -11 : 0) * actionPhase;
        const vertical = (1-arrival) * 16 - (reduced ? 0 : 14 * breathe);
        const rotation = setting.rotation + (reduced ? 0 : (gesture === 'faq' ? 0 : gesture === 'thinking' ? -10 : gesture === 'about' ? -8 : gesture === 'products' ? -12 : 5) * breathe);
        const magnitude = setting.scale * (1 + .055 * breathe);
        rig.setAttribute('transform', 'translate(' + (setting.offsetX + horizontal).toFixed(2) + ' ' +
          (setting.offsetY + vertical).toFixed(2) + ') translate(180 180) rotate(' +
          rotation.toFixed(2) + ') scale(' + magnitude.toFixed(3) + ') translate(-180 -180)');
      }
      for (const line of bodyLines) {
        const stage = Number(line.dataset.stage ?? 1);
        const internal = line.dataset.secondary === 'true';
        const phase = isFaq
          ? ease(.01 + stage*.039, .115 + stage*.042, p)
          : ease(.025 + stage*.044, .19 + stage*.088, p);
        // On leaving a chapter, stroke geometry unspools in reverse rather
        // than fading an unchanged SVG silhouette to zero.
        const unwindStart = isHero ? .90 : .84;
        const unwindEnd = isHero ? .995 : .985;
        const release = reduced ? 1 : 1 - ease(
          unwindStart + (isFaq ? (7-stage)*.008 : (2-Math.min(2,stage))*.018),
          unwindEnd, p);
        const done = reduced ? 1 : phase * release;
        paintPaths(line, done);
        // Open, extend, or fold each digit separately relative to its MCP pivot.
        const pivot = line.dataset.articulate && ARTICULATION_PIVOTS[line.dataset.articulate];
        if (pivot) {
          const [x,y,degrees] = pivot;
          const flex = (1 - (reduced ? 1 : ease(isFaq ? .12 : .055, isFaq ? .57 : .46, p))) * degrees;
          const spread = reduced ? 0 : (line.dataset.articulate === 'thumb' ? -7 : line.dataset.articulate === 'little' ? 6 : 0) * breathe;
          line.setAttribute('transform', 'rotate(' + (flex+spread).toFixed(2) + ' ' + x + ' ' + y + ')');
        }
        // Fine internal contours can be removed on low power/mobile without changing silhouettes.
        line.style.display = simplified() && internal && !isFaq && !line.dataset.stroke?.startsWith('profile-') ? 'none' : '';
      }
      if (question) {
        question.style.opacity = (reduced ? 1 : ease(.25,.32,p) * departure).toFixed(3);
        const mark = question.querySelector('[data-question-path]');
        if (mark) paintPaths(mark, reduced ? 1 : ease(.26,.39,p)); // visible when all five digits are on-screen
        const dot = question.querySelector<SVGElement>('[data-question-dot]');
        if (dot) dot.style.opacity = String(reduced ? 1 : ease(.33,.39,p));
      }
      if (action) {
        action.style.opacity = String(reduced ? 1 : ease(.39,.60,p) * departure);
        const wire = action.querySelector('[data-action-wire]');
        if (wire) paintPaths(wire, reduced ? 1 : ease(.40,.69,p)*(1-ease(.88,.99,p)));
        const node = action.querySelector<SVGElement>('[data-touch-point]');
        if (node) {
          node.style.transformBox = 'fill-box';
          node.style.transformOrigin = 'center';
          node.style.transform = 'scale(' + (1 + .25 * (reduced ? 0 : Math.sin(Math.PI * actionPhase))) + ')';
        }
      }
      if (productAction) {
        productAction.style.opacity = String(reduced ? 1 : ease(.36,.60,p) * departure);
        productAction.style.transform = 'translate(0 ' + (reduced ? 0 : -7 * breathe).toFixed(2) + 'px)';
      }
      for (const hand of reach) {
        const right = hand.dataset.reach === 'right';
        const move = reduced ? 0 : (1-ease(.09,.67,p)) * 70;
        const touch = reduced ? 0 : -7 * breathe;
        // Both fingertips actually meet at the center, rather than hovering apart.
        const approach = reduced ? 15 : 15 * ease(.43,.77,p);
        hand.setAttribute('transform',
          right ? 'translate(' + (760+move-approach).toFixed(2) + ' ' + touch.toFixed(2) + ') scale(-1 1)'
                : 'translate(' + (-move+approach).toFixed(2) + ' ' + touch.toFixed(2) + ')');
        hand.style.opacity = opacity.toFixed(3);
      }
      for (const line of reachLines) {
        const stage = Number(line.dataset.reachStage ?? 1);
        const form = ease(.035+stage*.085, .39+stage*.082,p);
        const release = 1-ease(.83+stage*.017,.994,p);
        paintPaths(line, reduced ? 1 : form*release);
      }
      for (const line of contourLines) {
        if (simplified()) { line.style.display = 'none'; continue; }
        paintPaths(line, reduced ? 1 : ease(.27,.65,p)*(1-ease(.86,.99,p)));
      }
      if (connection) {
        connection.style.opacity = String(reduced ? 1 : ease(.52,.68,p) * departure);
        const wire = connection.querySelector('[data-connection-wire]');
        if (wire) paintPaths(wire, reduced ? 1 : ease(.49,.69,p)*(1-ease(.88,.99,p)));
      }
      // Keep the purely decorative layer inert for mouse, touch, keyboard.
      mount.style.pointerEvents = 'none';
    }
    const calculate = () => {
      raf = 0;
      if (!active) return;
      const rect = root.getBoundingClientRect();
      const value = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      if (Math.abs(value - lastValue) < .002 && !preference.matches) return;
      lastValue = value;
      render(value, preference.matches);
    };
    const schedule = () => {
      if (active && !raf) raf = window.requestAnimationFrame(calculate);
    };
    // Progress is measured only for nearby artwork; no continuous idle loop.
    const observer = new IntersectionObserver(entries => {
      active = entries.some(entry => entry.isIntersecting);
      if (active) schedule();
    }, { rootMargin:'120px 0px 120px 0px' });
    observer.observe(root);
    const onPreference = () => { lastValue = -1; render(.70, preference.matches); schedule(); };
    const onResize = () => { lastValue=-1; schedule(); };
    if (preference.matches) render(.70, true);
    else if (isHero) render(.22,false); // no empty hero flash on hydration
    window.addEventListener('scroll', schedule, { passive:true });
    window.addEventListener('resize', onResize, { passive:true });
    preference.addEventListener('change', onPreference);
    mobile.addEventListener('change', onResize);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      preference.removeEventListener('change', onPreference);
      mobile.removeEventListener('change', onResize);
    };
  }, [gesture]);

  return (
    <div className={'gesture-dock gesture-' + gesture + ' ' + className}
      ref={dock} data-variant={gesture} aria-hidden="true">
      <svg className="gesture-svg" viewBox={gesture === 'contact' ? '0 0 760 360' : '0 0 360 390'}
        preserveAspectRatio="xMidYMid meet" focusable="false">
        <title>{gesture === 'faq' ? 'Five fingers and a line-drawn question mark' : 'Ladder7 cinematic wireframe gesture'}</title>
        {gesture === 'contact' ? <PairHands/> : <WireHand gesture={gesture}/>}
      </svg>
    </div>
  );
}
