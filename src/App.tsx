// Global design system first: component stylesheets imported below must come
// later in the cascade so their overrides win at equal specificity.
import "./styles/index.css";
import { Suspense, type ComponentType } from "react";
import { Route, Routes } from "react-router";
import { RoutePrefetch, type RouteImporters } from "./components/common/RoutePrefetch";
import { RouteTransition } from "./components/common/RouteTransition";
import { ScrollManager } from "./components/common/ScrollManager";
import { EnquiryProvider } from "./context/EnquiryContext";
import { MainLayout } from "./layouts/MainLayout";
import { ROUTES, type PageKey } from "./routes";

export type PageComponents = Record<PageKey, ComponentType>;

/**
 * Application shell, shared by the browser (main.tsx) and the build-time
 * renderer (entry-server.tsx). Page components are injected: lazy chunks in
 * the browser, eager modules on the server, so static HTML always contains
 * the full page while visitors only download the page they open.
 *
 * Both entries must render the identical tree (React's useId depends on it),
 * which is why the prefetcher lives here rather than in main.tsx.
 */
export function App({ pages, importers }: { pages: PageComponents; importers?: RouteImporters }) {
  const NotFound = pages.notFound;
  return (
    <EnquiryProvider>
      <ScrollManager />
      <RouteTransition />
      <RoutePrefetch importers={importers} />
      <MainLayout>
        <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
          <Routes>
            {ROUTES.map((route) => {
              const Page = pages[route.page];
              return <Route key={route.path} path={route.path} element={<Page />} />;
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </EnquiryProvider>
  );
}
