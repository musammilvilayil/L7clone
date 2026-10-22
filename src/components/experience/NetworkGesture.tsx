import { useEffect, useRef, useState } from 'react';

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
  { id:'wrist',d:'M99 310 C101 281 108 262 127 247 C145 234 166 232 187 233 C212 232 236 250 239 277 L244 314' },
  { id:'index',d:'M126 247 C110 229 91 215 73 201 C55 185 50 175 58 164 C67 152 81 156 96 168 L151 208' },
  { id:'finger-fold',d:'M151 208 C170 201 182 186 194 175 C208 162 220 163 227 173 C234 182 230 192 220 202 L196 226' },
  { id:'thumb',d:'M187 233 C176 216 167 201 160 186 C154 169 159 156 171 153 C184 150 191 160 195 174' },
  { id:'palm',secondary:true,d:'M120 270 C153 255 198 264 227 279 M135 292 C164 284 205 296 230 294' },
  { id:'depth',secondary:true,d:'M151 208 C159 228 168 244 183 267 M176 234 L207 274 L229 250' },
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
const CONFIDENT_HAND: Stroke[] = [
  { id:'thumb-up', d:'M129 234 C119 214 120 182 123 154 L128 101 C128 78 137 69 150 72 C165 75 168 87 165 103 L159 176 C176 182 196 190 210 202' },
  { id:'index-fold', d:'M210 202 C235 187 246 195 252 206 C255 213 253 222 246 228' },
  { id:'middle-fold', d:'M246 228 C266 223 272 235 268 246 C266 254 259 260 251 262' },
  { id:'ring-fold', d:'M251 262 C268 267 265 284 253 290 C248 292 240 292 234 291' },
  { id:'little-fold', d:'M234 291 C241 305 233 316 216 318 L158 316' },
  { id:'palm-wrist', d:'M158 316 C137 311 122 299 107 280 C96 265 96 249 107 241 C114 236 123 235 129 234' },
  { id:'crease-one', secondary:true, d:'M130 254 C159 245 193 249 224 260 M143 283 C165 278 194 284 227 295' },
  { id:'crease-two', secondary:true, d:'M158 195 C166 223 171 253 172 307 M186 218 L199 255 L211 309' },
  { id:'thumb-joint', secondary:true, d:'M124 146 Q142 153 160 148' },
];
const HANDS: Record<Exclude<GestureVariant, 'contact'>, Stroke[]> = {
  hero: OPEN_HAND, thinking: THINK_HAND, about: WELCOME_HAND, digital: BUILD_HAND,
  automation: POINT_HAND, strategy: THINK_HAND, development: PINCH_HAND,
  products: POINT_HAND, why: CONFIDENT_HAND, faq: OPEN_HAND,
};
const POSITION: Record<Exclude<GestureVariant, 'contact'>, Config> = {
  hero: { rotation: -9, scale: .94, offsetX: 8, offsetY: 0 },
  thinking: { rotation: 18, scale: .94, offsetX: 0, offsetY: -7 },
  about: { rotation: -25, scale: .95, offsetX: -7, offsetY: 13, node:[268,182] },
  digital: { rotation: 13, scale: 1, offsetX: 5, offsetY: 0, node:[268,182] },
  automation: { rotation: -18, scale: .99, offsetX: 0, offsetY: 0, node:[144,62] },
  strategy: { rotation: 12, scale: 1, offsetX: 0, offsetY: 0 },
  development: { rotation: -14, scale: 1, offsetX: 0, offsetY: 2, node:[192,142] },
  products: { rotation: 57, scale: .93, offsetX: 12, offsetY: -9, node:[144,62] },
  why: { rotation: 13, scale: .9, offsetX: -6, offsetY: 4 },
  faq: { rotation: 0, scale: .93, offsetX: 0, offsetY: 30 },
};

function WireHand({ gesture, progress, reduced, mirrored = false }: {
  gesture: Exclude<GestureVariant, 'contact'>;
  progress: number;
  reduced: boolean;
  mirrored?: boolean;
}) {
  const lines = HANDS[gesture];
  const setting = POSITION[gesture];
  const enter = reduced ? 1 : ease(.045, gesture === 'faq' ? .72 : .35, progress);
  const exit = reduced ? 1 : 1 - ease(.82, .99, progress);
  const visibility = reduced ? 1 : ease(.005, .08, progress) * exit;
  const position = `translate(${setting.offsetX} ${setting.offsetY}) translate(180 180) scale(${setting.scale}) rotate(${setting.rotation}) translate(-180 -180)`;
  const gestureDraw = (line: Stroke) => {
    if (reduced) return 1;
    if (gesture !== 'faq') return ease(.06 + (line.secondary ? .13 : 0), line.secondary ? .52 : .36, progress);
    const stage = line.stage ?? 7;
    return ease(.035 + stage * .048, .12 + stage * .054, progress);
  };

  return (
    <g transform={mirrored ? 'translate(360 0) scale(-1 1)' : undefined} opacity={visibility}>
      <g transform={position} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {lines.map(line => {
          const draw = gestureDraw(line);
          return (
            <g key={line.id} data-stroke={line.id}>
              <path d={line.d} stroke="var(--gesture-depth, #194878)" strokeWidth={line.secondary ? 1.15 : 2.8}
                transform="translate(5.5 5.8)" opacity={.28 * enter} pathLength={1}
                strokeDasharray="1" strokeDashoffset={1 - draw}/>
              <path d={line.d} stroke={line.secondary ? 'var(--gesture-inner, #5d9ecc)' : 'var(--gesture-stroke, #8fcbff)'}
                strokeWidth={line.secondary ? 1.2 : 2.2} opacity={line.secondary ? .50 : 1}
                pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
            </g>
          );
        })}
        {setting.node && gesture !== 'faq' && (
          <g opacity={reduced ? 1 : ease(.38,.62,progress)}>
            <circle cx={setting.node[0]} cy={setting.node[1]} r="7" fill="none" stroke="var(--gesture-stroke, #8fcbff)" strokeWidth="1.2"/>
            <circle cx={setting.node[0]} cy={setting.node[1]} r="2" fill="var(--gesture-stroke, #8fcbff)"/>
          </g>
        )}
      </g>
      {gesture === 'faq' && (
        <g stroke="var(--gesture-stroke, #8fcbff)" strokeWidth="2" fill="none"
          opacity={reduced ? 1 : ease(.47, .55, progress)}>
          <path d="M150 47 C139 27 146 10 167 10 C185 10 197 26 184 40 L171 51 L171 59"
            pathLength={1} strokeDasharray="1" strokeDashoffset={1 - (reduced ? 1 : ease(.48,.64,progress))}/>
          <circle cx="171" cy="69" r="2.6" fill="var(--gesture-stroke, #8fcbff)" stroke="none"
            opacity={reduced ? 1 : ease(.60,.69,progress)}/>
        </g>
      )}
    </g>
  );
}

function PairHands({ progress, reduced }: { progress: number; reduced: boolean }) {
  const enter = reduced ? 1 : ease(.08,.37,progress);
  const opacity = reduced ? 1 : ease(.02,.16,progress) * (1-ease(.85,.98,progress));
  return (
    <g opacity={opacity}>
      <g transform={`translate(${60 + enter * 75} 17) scale(.82) rotate(-38 180 180)`}>
        <WireHand gesture="about" progress={progress} reduced={reduced}/>
      </g>
      <g transform={`translate(${700 - enter * 75} 17) scale(-.82 .82) rotate(-38 180 180)`}>
        <WireHand gesture="about" progress={progress} reduced={reduced}/>
      </g>
      <path d="M351 183 Q380 159 409 183" stroke="var(--gesture-stroke,#8fcbff)"
        strokeWidth="1.3" fill="none" opacity={reduced ? 1 : ease(.4,.6,progress)}
        pathLength={1} strokeDasharray="1" strokeDashoffset={1-enter}/>
      <circle cx="380" cy="177" r="3.3" fill="var(--gesture-stroke,#8fcbff)"
        opacity={reduced ? 1 : ease(.52,.72,progress)}/>
    </g>
  );
}

export function NetworkGesture({ gesture, className = '' }: { gesture: GestureVariant; className?: string }) {
  const dock = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ progress: 0, reduced: false });
  useEffect(() => {
    const root = dock.current;
    if (!root) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let active = false;
    const calculate = () => {
      raf = 0;
      if (!active) return;
      const rect = root.getBoundingClientRect();
      const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      setState(previous =>
        Math.abs(previous.progress - progress) < .004 && previous.reduced === preference.matches
          ? previous : { progress, reduced: preference.matches });
    };
    const schedule = () => { if (active && !raf) raf = window.requestAnimationFrame(calculate); };
    const observer = new IntersectionObserver(entries => {
      active = entries.some(entry => entry.isIntersecting);
      if (active) schedule();
    }, { rootMargin: '160px 0px 160px 0px' });
    observer.observe(root);
    const onPreference = () => {
      if (preference.matches) setState({ progress: .75, reduced: true });
      else schedule();
    };
    if (preference.matches) setState({ progress: .75, reduced: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', onPreference);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', onPreference);
    };
  }, [gesture]);

  return (
    <div className={`gesture-dock gesture-${gesture} ${className}`} data-variant={gesture} ref={dock} aria-hidden="true">
      <svg className="gesture-svg" viewBox={gesture === 'contact' ? '0 0 760 360' : '0 0 360 390'}
        preserveAspectRatio="xMidYMid meet" focusable="false">
        <title>{gesture === 'faq' ? 'Five-finger wireframe hand and question mark' : 'Ladder7 wireframe hand illustration'}</title>
        {gesture === 'contact'
          ? <PairHands progress={state.progress} reduced={state.reduced}/>
          : <WireHand gesture={gesture} progress={state.progress} reduced={state.reduced}/>}
      </svg>
    </div>
  );
}
