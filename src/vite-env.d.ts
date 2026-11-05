/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_LEGACY_SITE_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_ENQUIRY_ENDPOINT?: string;
  readonly VITE_ALLOW_INDEXING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Build year, injected by vite.config.ts `define`. */
declare const __BUILD_YEAR__: number;

interface Window {
  /** Set once React has hydrated; read by the inline motion safety net in index.html. */
  __l7Hydrated?: boolean;
}
