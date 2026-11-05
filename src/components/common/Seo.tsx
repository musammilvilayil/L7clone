import { useEffect } from "react";
import type { PageKey } from "../../routes";
import { applyHead, buildHead } from "../../seo/head";

/**
 * Keeps <head> in sync on client-side navigation. The first page load already
 * has the same tags in its prerendered HTML (scripts/prerender.mjs), so this
 * only matters when moving between routes.
 */
export function Seo({ page }: { page: PageKey }) {
  useEffect(() => {
    applyHead(buildHead(page));
  }, [page]);
  return null;
}
