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
const THINK_HAND: Stroke[] = [
  // Iconic contemplative gesture: thumb horizontally cradling the jawline/chin
  // while the index finger rests gracefully upward along the cheek, with curled fist.
  { id: 'wrist-left', stage: 0, d: 'M126 332 C128 300 126 274 124 250' },
  { id: 'wrist-right', stage: 0, d: 'M222 332 C220 302 226 276 234 252' },
  { id: 'wrist-base', stage: 0, d: 'M126 332 C156 340 192 340 222 332' },
  // Thumb cradles the underside of the chin horizontally
  { id: 'thumb-chin', stage: 1, d: 'M124 250 C116 236 112 216 122 202 C134 188 156 188 184 196 L208 208' },
  // Index finger extends along cheek/temple with gentle thoughtful inward curve at tip
  { id: 'index-finger', stage: 2, d: 'M138 200 L138 98 C138 72 150 60 166 60 C180 60 190 72 188 98 L184 198' },
  // Curled middle, ring, pinky form the supportive fist resting under chin
  { id: 'folded-middle', stage: 3, d: 'M184 198 C204 190 224 194 230 208 C234 220 224 230 206 232 L182 234' },
  { id: 'folded-ring', stage: 4, d: 'M182 234 C200 234 216 238 220 250 C224 260 214 268 198 268 L172 268' },
  { id: 'folded-pinky', stage: 5, d: 'M172 268 C188 268 202 274 204 284 C206 294 194 300 180 300 L162 298 L234 252' },
  // Anatomical creases & dorsal volume
  { id: 'index-ridge', stage: 6, secondary: true, d: 'M164 64 L164 198' },
  { id: 'index-joint-1', stage: 6, secondary: true, d: 'M138 126 Q164 132 187 126' },
  { id: 'index-joint-2', stage: 6, secondary: true, d: 'M138 162 Q164 168 185 162' },
  { id: 'thumb-cradle-ridge', stage: 6, secondary: true, d: 'M122 202 Q156 194 196 204' },
  { id: 'thenar-crease', stage: 6, secondary: true, d: 'M132 240 C144 264 152 290 158 320' },
  { id: 'fist-wire-1', stage: 6, secondary: true, d: 'M128 270 Q164 262 222 266' },
  { id: 'fist-wire-2', stage: 6, secondary: true, d: 'M126 298 Q164 292 218 294' },
];

const CAPABILITY_HAND: Stroke[] = [
  // Digital capability connection gesture: hand bridging toward network hub
  { id: 'wrist-left', stage: 0, d: 'M115 322 C120 292 125 266 132 244' },
  { id: 'wrist-right', stage: 0, d: 'M215 326 C210 296 214 272 224 248' },
  { id: 'wrist-bottom', stage: 0, d: 'M115 322 C145 332 185 334 215 326' },
  { id: 'thumb', stage: 1, d: 'M132 244 C116 230 100 214 92 198 C82 182 90 172 104 174 C118 176 134 194 154 218 L170 236' },
  { id: 'index-connect', stage: 2, d: 'M170 236 L230 166 C240 154 252 156 258 166 C264 176 256 186 244 196 L198 248' },
  { id: 'folded-middle', stage: 3, d: 'M198 248 C216 240 230 242 234 252 C238 262 228 270 212 272 L188 274' },
  { id: 'folded-ring', stage: 4, d: 'M188 274 C204 274 216 278 220 288 C222 296 212 302 198 302 L176 300' },
  { id: 'folded-pinky', stage: 5, d: 'M176 300 L224 248' },
  { id: 'index-joint', stage: 6, secondary: true, d: 'M200 196 Q220 204 238 194' },
  { id: 'thumb-joint', stage: 6, secondary: true, d: 'M100 182 Q118 196 140 210' },
  { id: 'palm-contour', stage: 6, secondary: true, d: 'M140 246 Q176 240 222 246' },
  { id: 'palm-wire', stage: 6, secondary: true, d: 'M128 278 Q170 272 216 276' },
  { id: 'knuckle-net', stage: 6, secondary: true, d: 'M154 218 L180 244 L212 234 L232 250' },
];

const TOUCH_HAND: Stroke[] = [
  // Intentional product interaction touch/tap gesture: index finger pressing down on capacitive surface
  { id: 'wrist-left', stage: 0, d: 'M126 324 C130 294 132 268 136 242' },
  { id: 'wrist-right', stage: 0, d: 'M226 320 C222 292 226 268 236 244' },
  { id: 'wrist-base', stage: 0, d: 'M126 324 C156 332 194 330 226 320' },
  { id: 'thumb-poise', stage: 1, d: 'M136 242 C120 228 104 212 96 196 C88 182 94 172 106 174 C118 176 133 190 152 212 L166 232' },
  { id: 'touch-index', stage: 2, d: 'M166 232 L172 118 C172 94 182 84 194 84 C206 84 216 94 214 118 L210 212' },
  { id: 'curl-middle', stage: 3, d: 'M210 212 C226 206 238 210 242 222 C246 234 236 242 220 244 L196 246' },
  { id: 'curl-ring', stage: 4, d: 'M196 246 C212 246 224 250 226 260 C228 268 218 276 204 276 L182 276' },
  { id: 'curl-pinky', stage: 5, d: 'M182 276 C196 276 206 280 208 288 C210 296 200 302 186 302 L168 300 L236 244' },
  { id: 'index-distal', stage: 6, secondary: true, d: 'M172 142 Q193 149 213 142' },
  { id: 'index-proximal', stage: 6, secondary: true, d: 'M169 180 Q192 186 211 180' },
  { id: 'index-axis', stage: 6, secondary: true, d: 'M194 88 L194 212' },
  { id: 'thumb-mesh', stage: 6, secondary: true, d: 'M102 182 Q120 196 142 210' },
  { id: 'palm-wire-1', stage: 6, secondary: true, d: 'M140 258 Q176 250 226 254' },
  { id: 'palm-wire-2', stage: 6, secondary: true, d: 'M132 286 Q172 280 220 282' },
];

const THUMBS_UP_HAND: Stroke[] = [
  // Bold, unmistakable thumbs-up approval gesture: thumb extended upright, fingers curled in a firm fist
  { id: 'wrist-left', stage: 0, d: 'M126 332 C128 302 128 276 130 252' },
  { id: 'wrist-right', stage: 0, d: 'M226 326 C224 298 228 274 236 252' },
  { id: 'wrist-bottom', stage: 0, d: 'M126 332 C156 340 196 338 226 326' },
  // Upright confident thumb
  { id: 'thumb-upright', stage: 1, d: 'M130 252 C116 230 108 192 108 155 C108 110 118 68 142 68 C162 68 172 90 170 125 L162 180' },
  // Four horizontally curled fingers forming the front of the fist
  { id: 'fist-index', stage: 2, d: 'M162 180 C180 174 210 176 220 192 C226 204 216 214 196 216 L164 216' },
  { id: 'fist-middle', stage: 3, d: 'M164 216 C184 216 210 220 216 232 C220 242 210 250 190 250 L160 250' },
  { id: 'fist-ring', stage: 4, d: 'M160 250 C180 250 204 254 208 266 C212 276 202 282 182 282 L154 282' },
  { id: 'fist-pinky', stage: 5, d: 'M154 282 C174 282 196 286 198 296 C200 304 190 310 174 310 L146 306 L236 252' },
  // Thumb joints, knuckles, and anatomical contours
  { id: 'thumb-joint', stage: 6, secondary: true, d: 'M110 146 Q136 152 165 146' },
  { id: 'thumb-tip-contour', stage: 6, secondary: true, d: 'M124 80 Q142 74 158 82' },
  { id: 'thumb-ridge', stage: 6, secondary: true, d: 'M142 72 L142 180' },
  { id: 'thenar-crease', stage: 6, secondary: true, d: 'M132 254 C142 274 148 298 150 320' },
  { id: 'knuckle-line-1', stage: 6, secondary: true, d: 'M164 196 Q190 200 216 194' },
  { id: 'knuckle-line-2', stage: 6, secondary: true, d: 'M164 232 Q190 236 214 232' },
  { id: 'fist-mesh-1', stage: 6, secondary: true, d: 'M138 268 Q170 260 228 264' },
  { id: 'fist-mesh-2', stage: 6, secondary: true, d: 'M134 296 Q170 290 222 292' },
];

const QUESTION_HAND: Stroke[] = [
  // Expressive inquiry & doubt gesture: index finger arcing into an inquiring question hook,
  // expressing curiosity and doubt without confusing arbitrary symbols
  { id: 'wrist-left', stage: 0, d: 'M132 328 C134 298 132 272 130 248' },
  { id: 'wrist-right', stage: 0, d: 'M224 328 C222 298 226 274 234 252' },
  { id: 'wrist-bottom', stage: 0, d: 'M132 328 C162 336 194 336 224 328' },
  { id: 'thumb-curious', stage: 1, d: 'M130 248 C112 234 94 218 88 202 C80 188 86 178 98 178 C112 178 126 190 144 212 L160 232' },
  // Index finger rises and curves forward into a distinct question-mark hook of curiosity/doubt
  { id: 'question-hook', stage: 2, d: 'M160 232 L160 134 C160 92 184 72 212 78 C232 82 242 100 234 118 C224 136 198 148 190 172 L190 214' },
  { id: 'folded-middle', stage: 3, d: 'M190 214 C210 208 226 212 230 224 C234 234 224 242 208 244 L186 246' },
  { id: 'folded-ring', stage: 4, d: 'M186 246 C202 246 216 250 218 260 C220 270 210 276 196 276 L176 276' },
  { id: 'folded-pinky', stage: 5, d: 'M176 276 C190 276 202 282 204 290 C206 298 194 304 180 304 L164 302 L234 252' },
  // Inner contours expressing the inquisitive hook
  { id: 'hook-inner-arc', stage: 6, secondary: true, d: 'M182 130 C182 102 196 90 214 94 C226 96 230 108 224 118 C216 130 198 140 192 158' },
  { id: 'hook-base-joint', stage: 6, secondary: true, d: 'M160 156 Q176 162 192 156' },
  { id: 'thumb-joint', stage: 6, secondary: true, d: 'M94 186 Q112 200 134 214' },
  { id: 'knuckle-arc', stage: 6, secondary: true, d: 'M160 232 Q180 222 198 222 Q218 226 232 236' },
  { id: 'thenar-crease', stage: 6, secondary: true, d: 'M136 242 C146 266 152 292 156 318' },
  { id: 'palm-wire-1', stage: 6, secondary: true, d: 'M132 274 Q166 266 222 270' },
  { id: 'palm-wire-2', stage: 6, secondary: true, d: 'M130 298 Q166 292 218 294' },
];

const WELCOME_HAND: Stroke[] = [
  { id:'wrist-left', d:'M119 316 C113 291 103 269 98 249' },
  { id:'wrist-right', d:'M237 314 C231 290 235 270 242 247' },
  { id:'thumb', d:'M98 249 C83 236 68 229 55 217 C42 205 45 192 56 187 C67 182 80 189 92 197 L122 219' },
  { id:'index', d:'M122 219 C119 193 109 167 106 144 C103 127 110 118 121 118 C133 118 139 127 140 145 L148 200' },
  { id:'middle', d:'M148 200 C141 170 133 131 134 113 C135 97 144 88 155 91 C168 95 171 107 172 120 L178 199' },
  { id:'ring', d:'M178 199 C180 168 182 139 186 125 C191 111 203 107 211 116 C220 126 218 139 215 151 L206 211' },
  { id:'little', d:'M206 211 C224 190 234 180 245 178 C258 178 266 189 261 201 L242 247' },
  { id:'palm-base', d:'M98 249 C115 288 133 306 161 317 C187 326 216 322 237 314' },
  { id:'mesh-one', secondary:true, d:'M118 240 Q161 222 217 241 M128 264 Q174 252 229 260 M151 288 Q188 284 224 281' },
  { id:'mesh-two', secondary:true, d:'M137 222 C138 246 148 278 161 312 M174 215 C179 239 185 278 190 314 M202 228 L210 260 L219 290' },
];

const HANDS: Record<Exclude<GestureVariant, 'contact'>, Stroke[]> = {
  hero: OPEN_HAND,
  thinking: THINK_HAND,
  about: WELCOME_HAND,
  digital: CAPABILITY_HAND,
  automation: CAPABILITY_HAND,
  strategy: CAPABILITY_HAND,
  development: CAPABILITY_HAND,
  products: TOUCH_HAND,
  why: THUMBS_UP_HAND,
  faq: QUESTION_HAND,
};

const POSITION: Record<Exclude<GestureVariant, 'contact'>, Config> = {
  hero: { rotation: -9, scale: .94, offsetX: 8, offsetY: 0 },
  thinking: { rotation: -6, scale: 1.05, offsetX: 0, offsetY: 0 },
  about: { rotation: -18, scale: .95, offsetX: -5, offsetY: 10, node:[268,182] },
  digital: { rotation: 8, scale: 1.02, offsetX: -6, offsetY: 0, node:[256,168] },
  automation: { rotation: 8, scale: 1.02, offsetX: -6, offsetY: 0, node:[256,168] },
  strategy: { rotation: 8, scale: 1.02, offsetX: -6, offsetY: 0, node:[256,168] },
  development: { rotation: 8, scale: 1.02, offsetX: -6, offsetY: 0, node:[256,168] },
  products: { rotation: -10, scale: 1.02, offsetX: 0, offsetY: 0, node:[196,88] },
  why: { rotation: 0, scale: 1.02, offsetX: 0, offsetY: 6 },
  faq: { rotation: 8, scale: 1.02, offsetX: 0, offsetY: 4 },
};

/**
 * An SVG rig with scroll-scrubbed formation, articulation, interaction, and departure.
 * All per-frame updates happen on SVG nodes, not in React render/state.
 */
function WireHand({ gesture }: { gesture: Exclude<GestureVariant, 'contact'> }) {
  const lines = HANDS[gesture];
  const setting = POSITION[gesture];
  const openPalm = gesture === 'hero' || gesture === 'about';
  return (
    <g data-gesture-body="" data-kind={gesture}>
      <g data-hand-rig=""
        transform={'translate(' + setting.offsetX + ' ' + setting.offsetY + ') translate(180 180) rotate(' + setting.rotation + ') scale(' + setting.scale + ') translate(-180 -180)'}
        fill="none" strokeLinecap="round" strokeLinejoin="round">
        {lines.map((line, index) => (
          <g key={line.id} data-stroke={line.id} data-stage={line.stage ?? (line.secondary ? 6 : index < 3 ? 0 : 1)}
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
        {/* A quiet face profile gives the Vision hand an unambiguous “thinking” read. */}
        {gesture === 'thinking' && (
      <g data-thought-profile="" transform="translate(-48 0)" fill="none" stroke="var(--gesture-inner,#68a5d3)" strokeLinecap="round" strokeLinejoin="round" opacity=".72">
            <path d="M266 54 C306 64 323 99 316 135 C311 159 297 174 287 187 C286 204 277 220 258 229 C239 235 221 229 208 215" strokeWidth="2" />
            <path d="M273 143 C286 139 296 141 303 146 M276 174 C286 177 295 176 301 171" strokeWidth="1.2" opacity=".72" />
            <path d="M254 229 C267 251 269 274 258 298" strokeWidth="1.35" opacity=".6" />
            <circle cx="281" cy="117" r="2.7" fill="var(--gesture-stroke,#a7dcff)" stroke="none" />
          </g>
        )}
        {/* Capability connection node & data link */}
        {['digital','automation','strategy','development'].includes(gesture) && (
          <g data-gesture-action="" opacity="0" stroke="var(--gesture-stroke,#a7dcff)" fill="none">
            <path data-action-wire="" d="M256 168 Q284 144 310 152"
              strokeWidth="1.6" pathLength={1} strokeDasharray="1" strokeDashoffset="0"/>
            <circle cx="256" cy="168" r="6" strokeWidth="1.4"/>
            <circle cx="310" cy="152" r="8" strokeWidth="1.4"/>
            <circle data-touch-point="" cx="310" cy="152" r="3.2" fill="var(--gesture-stroke,#a7dcff)" stroke="none"/>
          </g>
        )}
        {/* Product touch & ripple action */}
        {gesture === 'products' && (
          <g data-product-action="" opacity="0" stroke="var(--gesture-stroke,#a7dcff)" fill="none">
            <circle cx="196" cy="88" r="36" strokeWidth="1" strokeDasharray="3 6" opacity="0.42"/>
            <circle cx="196" cy="88" r="23" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.7"/>
            <circle cx="196" cy="88" r="10" strokeWidth="1.7"/>
            <circle cx="196" cy="88" r="3.2" fill="var(--gesture-stroke,#a7dcff)" stroke="none"/>
          </g>
        )}
        {/* Keep the FAQ’s doubt cue literal as well as gestural: an open inquiry plus a question mark. */}
        {gesture === 'faq' && (
          <g data-question-symbol="" fill="none" stroke="var(--gesture-stroke,#a7dcff)" strokeLinecap="round" strokeLinejoin="round">
            <path d="M267 61 C285 39 318 48 321 75 C323 96 304 105 291 118 C283 126 282 136 282 146" strokeWidth="3.3" />
            <circle cx="282" cy="169" r="4.5" fill="var(--gesture-stroke,#a7dcff)" stroke="none" />
          </g>
        )}
      </g>
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
    const action = root.querySelector<SVGGElement>('[data-gesture-action]');
    const productAction = root.querySelector<SVGGElement>('[data-product-action]');
    const connection = root.querySelector<SVGGElement>('[data-contact-connection]');
    const setting = gesture === 'contact' ? null : POSITION[gesture];
    const isHero = gesture === 'hero';
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
      const aboutFold = gesture === 'about' ? (reduced ? 0 : ease(.28, .84, p)) : 0;
      mount.dataset.phase = reduced ? 'rest' : p < .33 ? 'form' : p < .82 ? 'act' : 'release';
      mount.dataset.progress = p.toFixed(3);
      const opacity = arrival * departure;
      if (body) body.style.opacity = opacity.toFixed(3);
      if (setting && rig) {
        const fromLeft = gesture === 'about' ? -42 : gesture === 'thinking' ? 25 : 0;
        const fromRight = isHero ? 22 : gesture === 'products' ? 35 : 0;
        const horizontal = (fromLeft + fromRight) * (1 - arrival) +
          (gesture === 'products' ? -12 : ['digital','automation','strategy','development'].includes(gesture) ? -10 : 0) * actionPhase +
          (gesture === 'about' ? 30 * aboutFold : 0);
        const vertical = (1-arrival) * 16 - (reduced ? 0 : 14 * breathe) + (gesture === 'about' ? 10 * aboutFold : 0);
        const rotation = setting.rotation +
          (reduced ? 0 : (gesture === 'faq' ? 3 : gesture === 'thinking' ? -5 : gesture === 'about' ? (-5 + 16 * aboutFold) : gesture === 'products' ? -7 : 3) * (breathe || 1));
        const magnitude = setting.scale * (1 + .055 * breathe) * (gesture === 'about' ? (1 - 0.08 * aboutFold) : 1);
        rig.setAttribute('transform', 'translate(' + (setting.offsetX + horizontal).toFixed(2) + ' ' +
          (setting.offsetY + vertical).toFixed(2) + ') translate(180 180) rotate(' +
          rotation.toFixed(2) + ') scale(' + magnitude.toFixed(3) + ') translate(-180 -180)');
      }
      for (const line of bodyLines) {
        const stage = Number(line.dataset.stage ?? 1);
        const internal = line.dataset.secondary === 'true';
        const phase = ease(.02 + stage*.038, .16 + stage*.078, p);
        const unwindStart = isHero ? .90 : .84;
        const unwindEnd = isHero ? .995 : .985;
        const release = reduced ? 1 : 1 - ease(
          unwindStart + (2-Math.min(2,stage))*.018,
          unwindEnd, p);
        const done = reduced ? 1 : phase * release;
        paintPaths(line, done);
        // Open, extend, or fold each digit separately relative to its MCP pivot.
        const pivot = line.dataset.articulate && ARTICULATION_PIVOTS[line.dataset.articulate];
        if (pivot) {
          const [x,y,degrees] = pivot;
          if (gesture === 'about') {
            const digit = line.dataset.articulate;
            const foldAngle = digit === 'thumb' ? (24 * aboutFold)
              : digit === 'index' ? (28 * aboutFold)
              : digit === 'middle' ? (20 * aboutFold)
              : digit === 'ring' ? (-18 * aboutFold)
              : (-30 * aboutFold);
            const foldScaleY = 1 - 0.22 * aboutFold;
            line.setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + foldAngle.toFixed(2) + ') scale(1 ' + foldScaleY.toFixed(3) + ') translate(' + (-x) + ' ' + (-y) + ')');
          } else {
            const flex = (1 - (reduced ? 1 : ease(.055, .46, p))) * degrees;
            const spread = reduced ? 0 : (line.dataset.articulate === 'thumb' ? -7 : line.dataset.articulate === 'little' ? 6 : 0) * breathe;
            line.setAttribute('transform', 'rotate(' + (flex+spread).toFixed(2) + ' ' + x + ' ' + y + ')');
          }
        }
        line.style.display = simplified() && internal && !line.dataset.stroke?.startsWith('profile-') ? 'none' : '';
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
        <title>{gesture === 'faq' ? 'Wireframe hand gesture expressing inquiry and questioning' : 'Ladder7 cinematic wireframe gesture'}</title>
        {gesture === 'contact' ? <PairHands/> : <WireHand gesture={gesture}/>}
      </svg>
    </div>
  );
}
